import {
	Component,
	ElementRef,
	OnInit,
	Renderer2,
	ViewChild,
} from "@angular/core"
import { AngularFirestore } from "@angular/fire/firestore"
import { BehaviorSubject, Subscription } from "rxjs"
import { AuthService } from "src/app/auth.service"
import { CustomerModel } from "src/app/classes/customerModel"
import { News } from "src/app/classes/news"
import { sliderImages } from "src/app/classes/slider"
import { environment } from "src/environments/environment"
import * as util from "../../utils"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"
import {
	DomSanitizer,
	SafeResourceUrl,
} from "@angular/platform-browser"
// import { Modal } from "bootstrap"

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
	@ViewChild("modalElement", { static: false }) modal!: ElementRef
	images: { image: string; title: string }[] = [
		{
			image: "../assets/images/doctors_image.png",
			title: "Your Obesity Doctors",
		},
		{
			image: "../assets/images/ideal-weight-image.png",
			title: "Give Your Body <br> The Love It Deserves",
		},
		{
			image:
				"../assets/images/front-view-young-female-sport-outfit-measuring-her-body.jpg",
			title: "Get In Your <br> Best Shape",
		},
	]
	videos: string[] = [
		"assets/videos/SSC.mp4",
		"assets/videos/SSC.mp4",
		"assets/videos/SSC.mp4",
	]
	newsList: News[] = []

	gender: string = "male" // Default gender
	weight!: number // User's input weight
	height!: number // User's input height in inches
	iframeSrc: SafeResourceUrl // Use SafeResourceUrl for sanitized iframe URLs
	searchCity: string = ""
	showCityList: boolean = false
	cities: string[] = []
	idealWeight: number | null = null

	constructor(
		private db: AngularFirestore,
		private auth: AuthService,
		private modalService: NgbModal,
		private sanitizer: DomSanitizer,
		private el: ElementRef,
		private renderer: Renderer2
	) {}

	ngOnInit(): void {
		this.getNews()
		this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
			this.cityMap["LUDHIANA"]
		)
		const script = this.renderer.createElement("script")
		script.src = "https://widget.tagembed.com/embed.min.js"
		script.type = "text/javascript"
		script.async = true

		// Append script after the component is rendered
		script.onload = () => {
			console.log("Tagembed widget loaded")
			this.loadWidget()
		}

		this.renderer.appendChild(this.el.nativeElement, script)

		setInterval(() => {
			this.nextSlide()
		}, 3000)
		this.groupImages()
		this.cities = Object.keys(this.cityMap)
	}
	openModal(content: any) {
		this.modalService.open(content, { centered: true })
	}
	loadWidget(): void {
		// Ensure the widget renders after script load
		const widget = document.querySelector(".tagembed-widget")
		if (widget) {
			widget.setAttribute("data-widget-id", "2157125")
			widget.setAttribute("data-tags", "false")
			widget.setAttribute(
				"view-url",
				"https://widget.tagembed.com/2157125"
			)
		}
	}
	calculateIdealWeight() {
		if (!this.weight || !this.height) {
			alert("Please enter weight and height (in feet)!")
			return
		}

		// Convert height from feet to inches
		const heightInInches = this.height * 12

		// Apply the ideal weight formula
		if (this.gender === "male") {
			this.idealWeight = heightInInches * 1 // 1 lb per inch
		} else {
			this.idealWeight = heightInInches * 0.9 // 0.9 lb per inch
		}
	}

	getNews() {
		this.db
			.collection(util.adminCollection)
			.doc(environment.adminId)
			.collection(util.newsCollection, (ref) =>
				ref.orderBy("createdOn", "desc")
			)
			.get()
			.toPromise()
			.then((response) => {
				if (response.docs.length !== 0) {
					response.docs.forEach((ele) => {
						let newsObj: News = Object.assign({}, ele.data() as News)
						this.newsList.push(newsObj)
					})
				}
			})
	}

	// City mapping
	cityMap: { [key: string]: string } = {
		LUDHIANA:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d872590.5328929112!2d74.36157277812501!3d31.31599340000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a83ceecb71813%3A0x4d88a1265ec53df8!2sSingla%20Slimming%20Clinic%3A%20Weight%20Loss%20Clinic!5e0!3m2!1sen!2sca!4v1739867189642!5m2!1sen!2sca",
		JALANDHAR:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3408.5508095679825!2d75.5785082753004!3d31.31615805720361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5bfe544e6bcb%3A0x9d0fc0e206360b23!2sMKC%20Mall!5e0!3m2!1sen!2sin!4v1739870638698!5m2!1sen!2sin",
		ZIRAKPUR:
			"https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3432.8583882507537!2d76.81409578147195!3d30.63794832481166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDM4JzE2LjYiTiA3NsKwNDknMDguMyJF!5e0!3m2!1sen!2sin!4v1739867835870!5m2!1sen!2sin",
		MOHALI:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109748.5657591985!2d76.4362851736922!3d30.728444147448787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feffcc02abd41%3A0xed52846db25d8da4!2sPlaza%20117!5e0!3m2!1sen!2sin!4v1739867926515!5m2!1sen!2sin",
		AMRITSAR:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3395.9946491958167!2d74.85414877531358!3d31.661366140163043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919648dc220ec3f%3A0x334711e8a643a67d!2sD-Block%20Rd%2C%20Gumtala%20Sub%20Urban%2C%20Ranjit%20Avenue%2C%20Amritsar%2C%20Punjab!5e0!3m2!1sen!2sin!4v1739954972100!5m2!1sen!2sin",
	}

	// Method to update the iframe source based on the city input
	onSearch(): void {
		let city = this.searchCity.toUpperCase().trim() // Get the city input, ensure it's uppercase and trimmed
		if (this.cityMap[city]) {
			this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
				this.cityMap[city]
			)
		} else {
			// If the city is not found, keep the default or show an alert
			alert("City not found! Please enter a valid city name.")
		}
	}
	selectCity(city: string): void {
		this.searchCity = city
		this.updateMap(city)
		this.showCityList = false
	}
	// Helper function to update iframeSrc
	private updateMap(city: string): void {
		this.iframeSrc = this.sanitizeUrl(this.cityMap[city])
	}

	// Helper function to sanitize URL
	private sanitizeUrl(url: string): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl(url)
	}
	// Method to update iframe when a predefined city is selected
	changeLocation(location: string): void {
		this.searchCity = location // Update the search field with the selected city
		this.onSearch() // Trigger the search method
	}
	currentIndex = 0
	statements = [
		{
			text: "Experiencing metabolic symptoms?",
			imageUrl: "../assets/images/metabolism.jpg",
		},
		{
			text: "chest pain or breathlessness?",
			imageUrl: "../assets/images/chestpain.jpg",
		},
		{
			text: "disrupted sleep or snoring?",
			imageUrl: "../assets/images/disruptedsleep.jpg",
		},
		{
			text: "joint pain limiting movement?",
			imageUrl: "../assets/images/jointpain.jpg",
		},
		{
			text: "concerned about liver health?",
			imageUrl: "../assets/images/liver.jpg",
		},
		{
			text: "worried about cancer risk?",
			imageUrl: "../assets/images/cancerrisk.jpg",
		},
		{
			text: "feeling shame or judged?",
			imageUrl: "../assets/images/disruptedsleep.jpg",
		},
		{
			text: "low self-esteem issues?",
			imageUrl: "../assets/images/selfesteem.jpg",
		},
		{
			text: "avoiding social interactions?",
			imageUrl: "../assets/images/disruptedsleep.jpg",
		},
		{
			text: "frustrated with weight control?",
			imageUrl: "../assets/images/weightcontrol.jpg",
		},
		{
			text: "feel guilty before eating?",
			imageUrl: "../assets/images/eating.jpg",
		},
		{
			text: "suffering from acidity?",
			imageUrl: "../assets/images/acidity.jpg",
		},
		{
			text: "troubled by bloating?",
			imageUrl: "../assets/images/bloating.jpg",
		},
		{
			text: "regaining weight often?",
			imageUrl: "../assets/images/regainweight.jpg",
		},
	]

	prevSlide() {
		this.currentIndex =
			this.currentIndex > 0
				? this.currentIndex - 1
				: this.getMaxIndex()
	}

	nextSlide() {
		this.currentIndex =
			this.currentIndex < this.getMaxIndex()
				? this.currentIndex + 1
				: 0
	}

	getMaxIndex() {
		// Use Math.ceil() to ensure the remaining items get their own slide
		return Math.ceil(this.statements.length / 4) - 1
	}

	cards = [
		{
			title: "Magic Tech",
			link: "magic-tech",
			colorClass: "bg-primary",
			description: `<img src="../assets/images/bullet_circle.png" height="9px"> Laser emits low-level energy that penetrates the skin and targets fat cells The targeted area appears slimmer as fat cell contents are expelled.<br>

<img src="../assets/images/bullet_circle.png" height="9px"> 1 session can reduce 0.5 to 1.5 inches<br>
<img src="../assets/images/bullet_circle.png" height="9px"> Stimulates 30% more collagen and elastin production.<br>
Encourages 300-500 calories to be burned post-session.`,
		},
		{
			title: "Cryolipolysis",
			link: "cryolipolysis",
			subtitle: "Card Title 1",
			colorClass: "bg-primary",
			description: `<img src="../assets/images/bullet_circle.png" height="9px"> The machine cools the fat cells to around -11°C to -13°C fat cells begin to freeze and die <br>
		<img src="../assets/images/bullet_circle.png" height="9px">	About 20-25% of the fat in the treated area is permanently reduced.
 Targets Stubborn Fat<br>

<img src="../assets/images/bullet_circle.png" height="9px"> Works on areas like abdomen, thighs, arms, double chin, and love handles, where fat is resistant to diet & exercise...`,
		},
		{
			title: "Cavitation",
			subtitle: "Card Title 1",
			colorClass: "bg-primary",
			link: "cavitation",
			description: `<img src="../assets/images/bullet_circle.png" height="9px"> Cavitation is a popular non-invasive fat reduction treatment used in weight loss and body contouring.<br>
				<img src="../assets/images/bullet_circle.png" height="9px"> It is also known as ultrasonic cavitation or ultrasound fat cavitation....`,
		},
		{
			title: "Diode Lipolaser",
			subtitle: "Card Title 1",
			link: "diode-lipolaser",
			colorClass: "bg-primary",
			description: `<img src="../assets/images/bullet_circle.png" height="9px"> Non surgical diode Lipolaser is an alternative of surgical laser liposuction.<br>
			<img src="../assets/images/bullet_circle.png" height="9px"> Where the treatment is done externally without any surgical procedure ultrasonic transducer/probe is moved externally on the target areas energy....`,
		},
		{
			title: "Body Firming",
			link: "body-firming",
			subtitle: "Card Title 1",
			colorClass: "bg-primary",
			description: `<img src="../assets/images/bullet_circle.png" height="9px"> As part of our wellness therapy we also offer body firming program. This will help you to shapeup and accentuate your figure.<br> <img src="../assets/images/bullet_circle.png" height="9px"> We have professional who can help you with the process.... `,
		},
	]
	HifuCards = [
		{
			title: "Saggy Arms",
			description: `<img src="../assets/images/bullet_circle.png" height="12px"> Skin Tightening & Lifting → 80-90% improvement in firmness after 2-3 months.<br>
			<img src="../assets/images/bullet_circle.png" height="12px"> Collagen & Elastin Boost → 75-85% increase in skin elasticity due to stimulated collagen production.<br>
			<img src="../assets/images/bullet_circle.png" height="12px"> Fat Reduction (if targeting fat deposits) → 20-30% reduction in localized fat per session.<br>
			<img src="../assets/images/bullet_circle.png" height="12px"> Wrinkle & Loose Skin Reduction → 70-85% decrease in sagging appearance over time.<br>
			<img src="../assets/images/bullet_circle.png" height="12px"> Improved Skin Texture & Smoothness → 80-90% of patients notice better skin quality.<br>
			<img src="../assets/images/bullet_circle.png" height="12px"> Long-Lasting Results`,
			image: "../assets/images/hifu_arms.jpeg",
			link: "#",
		},
		{
			title: "Saggy Thighs",
			description: `<img src="../assets/images/bullet_circle.png" height="12px"> Skin Tightening & Lifting → 70-85% improvement in skin firmness over 2-3 months<br>
<img src="../assets/images/bullet_circle.png" height="12px"> Collagen Production Boost → 80-90% increase, leading to improved elasticity<br>
<img src="../assets/images/bullet_circle.png" height="12px"> Fat Reduction → 20-30% reduction in localized fat per session<br>
<img src="../assets/images/bullet_circle.png" height="12px"> Reduced Wrinkles & Loose Skin → 60-75% reduction in thigh sagging`,
			image: "../assets/images/higu_thighs.jpg",
			link: "#",
		},
		{
			title: "Saggy Belly",
			description: `<img src="../assets/images/bullet_circle.png" height="12px"> Fat Reduction → 20-30% fat reduction in the treated area after 1-2 sessions.<br>
<img src="../assets/images/bullet_circle.png" height="12px"> Skin Tightening & Firmness → 70-85% improvement in skin elasticity over 2-3 months.<br>
<img src="../assets/images/bullet_circle.png" height="12px"> Reduction in Skin Laxity → 65-80% improvement in saggy skin after treatment.<br>
<img src="../assets/images/bullet_circle.png" height="12px"> Body Contouring Effect → 2-5 cm reduction in waist circumference after a full treatment course.<br>
<img src="../assets/images/bullet_circle.png" height="12px"> Visible Results → 90% of patients see noticeable improvement within 8-12 weeks.<br>
<img src="../assets/images/bullet_circle.png" height="12px"> Collagen & Elastin Production Boost → 80-90% increase for firmer, tighter skin.`,
			image: "../assets/images/hifu_belly.jpeg",
			link: "#",
		},
		{
			title: "Saggy Breast",
			description: `
<img src="../assets/images/bullet_circle.png" height="12px"> Tightening & Firmness → 75-90% of women experience noticeable tightening after 1-2 sessions.<br>
<img src="../assets/images/bullet_circle.png" height="12px"> 90% improvement in sking firmness & elasticity.<br>
<img src="../assets/images/bullet_circle.png" height="12px"> 70 - 80% collagen boost for perkier, youthful breasts<br>
<img src="../assets/images/bullet_circle.png" height="12px"> 100% non-surgical & pain-free no downtime<br>`,
			image: "../assets/images/hifu_breast.jpg",
			link: "#",
		},
	]
	images1: string[] = [
		"award_1.jpg",
		"award_2.jpg",
		"award_3.jpg",
		"award_4.jpg",
		"award_5.jpg",
		"award_6.jpg",
		"award_7.jpg",
		"award_8.jpg",
	]

	imageGroups: string[][] = []

	groupImages() {
		const chunkSize = 3 // Number of images per row
		for (let i = 0; i < this.images.length; i += chunkSize) {
			this.imageGroups.push(this.images1.slice(i, i + chunkSize))
		}
	}
	toggleCityList(): void {
		this.showCityList = !this.showCityList
	}
	openModalIdeal() {
		document.getElementById("customModal").classList.add("active")
	}

	closeModalIdeal() {
		document.getElementById("customModal").classList.remove("active")
	}
}
