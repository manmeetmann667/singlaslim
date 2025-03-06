import {
	Component,
	ElementRef,
	OnInit,
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
	images: { image: string; title: string }[] = [
		{
			image: "../assets/images/doctors_home.jpg",
			title: "Your Obseity Doctors",
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

	newsList: News[] = []

	gender: string = "male" // Default gender
	weight!: number // User's input weight
	height!: number // User's input height in inches
	iframeSrc: SafeResourceUrl // Use SafeResourceUrl for sanitized iframe URLs
	searchCity: string = "" // Bind to the search input field
	idealWeight: number | null = null

	constructor(
		private db: AngularFirestore,
		private auth: AuthService,
		private modalService: NgbModal,
		private sanitizer: DomSanitizer
	) {}

	ngOnInit(): void {
		this.getNews()
		this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
			this.cityMap["LUDHIANA"]
		)
		setInterval(() => {
			this.nextSlide()
		}, 3000)
	}
	openModal(content: any) {
		this.modalService.open(content, { centered: true })
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
	cityMap = {
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

	// Method to update iframe when a predefined city is selected
	changeLocation(location: string): void {
		this.searchCity = location // Update the search field with the selected city
		this.onSearch() // Trigger the search method
	}
	currentIndex = 0
	statements = [
		"Experiencing metabolic symptoms?",
		"chest pain or breathlessness?",
		"disrupted sleep or snoring?",
		"joint pain limiting movement?",
		"concerned about liver health?",
		"worried about cancer risk?",
		"feeling shame or judged?",
		"low self-esteem issues?",
		"avoiding social interactions?",
		"frustrated with weight control?",
		"feel guilty before eating?",
		"suffering from acidity?",
		"troubled by bloating?",
		"regaining weight often?",
	]

	prevSlide() {
		this.currentIndex =
			this.currentIndex > 0
				? this.currentIndex - 1
				: this.getMaxIndex()
	}

	nextSlide() {
		// Move to the next slide or reset back to the first slide if at the last slide
		this.currentIndex =
			this.currentIndex < this.getMaxIndex()
				? this.currentIndex + 1
				: 0
	}

	getMaxIndex() {
		// Calculate the number of slides required based on 3 items per slide
		return Math.floor(this.statements.length / 5)
	}
	cards = [
		{
			title: "Magic Tech",

			colorClass: "bg-primary",
			description:
				"Emsculpt stimulates 20,000+ contractions in a 30-minute session (equivalent to 20,000 crunches or squats",
		},
		{
			title: "Cryolipolysis",
			subtitle: "Card Title 1",
			colorClass: "bg-primary",
			description: ` The machine cools the fat cells to around -11°C to -13°C fat cells begin to freeze and die <br>

About 20-25% of the fat in the treated area is permanently reduced.<br>
✅ Targets Stubborn Fat<br>

Works on areas like abdomen, thighs, arms, double chin, and love handles, where fat is resistant to diet & exercise...`,
		},
		{
			title: "Card Title 3",
			subtitle: "Card Title 1",
			colorClass: "bg-primary",
			description:
				'A brief introduction to the topic. Click "Read More" for details...',
		},
		{
			title: "Card Title 4",
			subtitle: "Card Title 1",
			colorClass: "bg-primary",
			description:
				'Learn more about this interesting topic. Click "Read More" for details...',
		},
		{
			title: "Card Title 5",
			subtitle: "Card Title 1",
			colorClass: "bg-primary",
			description:
				'An engaging preview that leaves you curious. Click "Read More" for details...',
		},
		{
			title: "Card Title 6",
			subtitle: "Card Title 1",
			colorClass: "bg-primary",
			description:
				'A glimpse into an exciting subject. Click "Read More" for details...',
		},
	]
	HifuCards = [
		{
			title: "Saggy Arms",
			description: `✅ Skin Tightening & Lifting → 80-90% improvement in firmness after 2-3 months.<br>
			✅ Collagen & Elastin Boost → 75-85% increase in skin elasticity due to stimulated collagen production.<br>
			✅ Fat Reduction (if targeting fat deposits) → 20-30% reduction in localized fat per session.<br>
			✅ Wrinkle & Loose Skin Reduction → 70-85% decrease in sagging appearance over time.<br>
			✅ Improved Skin Texture & Smoothness → 80-90% of patients notice better skin quality.<br>
			✅ Long-Lasting Results`,
			image: "../assets/images/hifu_arms.jpeg",
			link: "#",
		},
		{
			title: "Saggy Thighs",
			description: `✅ Skin Tightening & Lifting → 70-85% improvement in skin firmness over 2-3 months<br>
✅ Collagen Production Boost → 80-90% increase, leading to improved elasticity<br>
✅ Fat Reduction → 20-30% reduction in localized fat per session<br>
✅ Reduced Wrinkles & Loose Skin → 60-75% reduction in thigh sagging`,
			image: "../assets/images/higu_thighs.jpg",
			link: "#",
		},
		{
			title: "Saggy Belly",
			description: `✅ Fat Reduction → 20-30% fat reduction in the treated area after 1-2 sessions.<br>
✅ Skin Tightening & Firmness → 70-85% improvement in skin elasticity over 2-3 months.<br>
✅ Reduction in Skin Laxity → 65-80% improvement in saggy skin after treatment.<br>
✅ Body Contouring Effect → 2-5 cm reduction in waist circumference after a full treatment course.<br>
✅ Visible Results → 90% of patients see noticeable improvement within 8-12 weeks.<br>
✅ Collagen & Elastin Production Boost → 80-90% increase for firmer, tighter skin.`,
			image: "../assets/images/hifu_belly.jpeg",
			link: "#",
		},
		{
			title: "Saggy Breast",
			description: `
<img src="../assets/images/blue_tick.png" height="16px"> Tightening & Firmness → 75-90% of women experience noticeable tightening after 1-2 sessions.<br>
✅ Increased Collagen Production → 80-95% improvement in collagen synthesis, leading to better elasticity.<br>
✅ Improved Lubrication & Hydration → 65-85% increase in natural lubrication, reducing vaginal dryness.<br>
✅ Enhanced Sensation & Sensitivity → 70-85% report improved sexual satisfaction.<br>
✅ Urinary Incontinence Reduction → 60-80% experience less urinary leakage or better bladder control.<br>
✅ Non-Surgical & Pain-Free Alternative → 90% prefer HIFU over surgical tightening methods.`,
			image: "../assets/images/hifu_breast.jpg",
			link: "#",
		},
	]
}
