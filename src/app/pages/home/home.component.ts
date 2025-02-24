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
	images: string[] = [
		"../assets/images/slider-1.png",
		"../assets/images/ideal-weight-image.png",
		"../assets/images/front-view-young-female-sport-outfit-measuring-her-body.jpg",
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
	}
	openModal(content: any) {
		this.modalService.open(content, { centered: true })
	}

	calculateIdealWeight() {
		if (!this.weight || !this.height) {
			alert("Please enter weight and height!")
			return
		}
		const heightInInches = this.height / 2.54
		if (this.gender === "male") {
			this.idealWeight = heightInInches * 1
		} else {
			this.idealWeight = heightInInches * 0.9
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
}
