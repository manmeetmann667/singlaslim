import { Component, OnInit } from "@angular/core"
import { AngularFirestore } from "@angular/fire/firestore"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import {
	ModalDismissReasons,
	NgbModal,
} from "@ng-bootstrap/ng-bootstrap"
import firebase from "firebase"
import { ToastrService } from "ngx-toastr"
import { Appointment } from "src/app/classes/appointment"
import { environment } from "src/environments/environment"
import firebaseApp from "firebase"
import { CustomerModel } from "src/app/classes/customerModel"
import * as util from "../../utils"
import { AuthService } from "src/app/auth.service"
import { LoaderService } from "src/app/loader.service"
import {
	ActivatedRoute,
	NavigationStart,
	Router,
} from "@angular/router"
import { Subscription } from "rxjs"
import { NavigationEvent } from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model"
import { AngularFireAuth } from "@angular/fire/auth"

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
	topMenuList: string[] = [
		"Home",
		"Media",
		"caseStudies",
		"Connect Us",
	]
	// menuList: string[] = ["ABOUT US", "News", "Capacity Building Program", "Our Projects", "Endorsement", "Donors and Partners", "Blogs", "About Us"]

	menuObjList = [
		{
			name: "About Us",
			list: [
				{
					name: "About our Company",
					list: [],
					path: "/our-company",
				},

				{
					name: "Meet our Team",
					list: [],
					path: "/our-members",
				},
			],
		},
		{
			name: "Weight Loss",
			list: [
				{ name: "Cryolipolysis", list: [], path: "/cryolipolysis" },
				{ name: "Magic Tech", list: [], path: "/magic-tech" },
				{ name: "Cavitation", list: [], path: "/cavitation" },
				// { name: "Breast Reduction", list: [], path: "#" },
				{
					name: "Diode Lipolaser",
					list: [],
					path: "/diode-lipolaser",
				},
				{ name: "Body Firming", list: [], path: "/body-firming" },
			],
		},
		// {
		// 	name: "Medical Facials",
		// 	list: [
		// 		// { name: "Back Treatments", list: [], path: "#" },
		// 		//   { name: "Calming Treatment", list: [], path: "#" },
		// 		//  { name: "Dermaplanning", list: [], path: "#" },
		// 		{ name: "Hydra Facial", list: [], path: "hydra-facial" },
		// 		{ name: "Photo Facial", list: [], path: "/photo-facial" },
		// 		{ name: "Carbon Facial", list: [], path: "/carbon-facial" },

		// 		// { name: "Red Carpet Facial", list: [], path: "#" },
		// 	],
		// },
		// {
		//   name: "Injectables",
		//   list: [
		//     { name: "Botox", list: [], path: "#" },
		//     { name: "Xeomin", list: [], path: "#" },
		//     { name: "Dysport", list: [], path: "#" },
		//     { name: "Kybella", list: [], path: "#" },
		//   ],
		// },

		{
			name: "Hifu",
			list: [
				{
					name: "Saggy Skin Treatment",
					list: [],
					path: "/saggy-skin-treatment",
				},
				{
					name: "Arms Tightening",
					list: [],
					path: "/arms-tightening",
				},
				{
					name: "Belly Tightening",
					list: [],
					path: "/belly-tightening",
				},
				{
					name: "Breast Tightening",
					list: [],
					path: "/breast-tightening",
				},
				{
					name: "Vaginal Tightening",
					list: [],
					path: "/vaginal-tightening",
				},
				{
					name: "Thighs Tightening",
					list: [],
					path: "/thighs-tightening",
				},

				// { name: "RF Microneedling", list: [], path: "#" },
				// { name: "Bacial Treatment", list: [], path: "#" },
				// { name: "Back Treatment", list: [], path: "#" },
			],
		},
		{
			name: "Skin Treatment",
			list: [
				// { name: "Skin Glowing", list: [], path: "/skin-glowing" },
				// { name: "Skin Rejuvenation", list: [], path: "/skin-rejuvenation" },
				// { name: "Oily Skin / Open Pores", list: [], path: "/oily-skin" },
				{
					name: "Saggy Skin Treatement",
					list: [],
					path: "/saggyskin-treatment",
				},
				{
					name: "Anti Ageing / Skin Lifting",
					list: [],
					path: "/skin-lifting",
				},
				{
					name: "Skin Tightening",
					list: [],
					path: "/skin-tightening",
				},

				//  { name: "Photo Gallery", list: [], path: "/photogallery" },
				// { name: "Videos", list: [], path: "#" },
				//
				// {
				//   name: "Publications", list: [

				//     { name: "Research Papers", list: [] },
				//     { name: "Policy Briefs", list: [] },
				//     { name: "Annual Reports", list: [] },
				//     { name: "Newsletters", list: [] },
				//     { name: "Flyers", list: [] },
				//     { name: "Brochures", list: [] },
				//   ]
				// },
				//{ name: "Blog", list: [], path: "/blog" },
			],
		},

		// {
		//   name: "Photo Gallery",
		//   list: [{ name: "Trebha Photo gallery", list: [], path: "/photogallery" }],
		// },

		// {
		//   name: "Services",
		//   list: [
		//     {
		//       name: "Meet our Team",
		//       list: [],
		//       path: "/team-members",
		//     },
		//     {
		//       name: "Transformations",
		//       list: [],
		//       path: "#",
		//     },
		//     {
		//       name: "Testimonials",
		//       list: [],
		//       path: "/testimonials",
		//     },
		//   ],
		// },
	]

	phoneForm: FormGroup
	userVerificationForm: FormGroup
	currentDate: Date = new Date()
	firstOrSecondForm: number = 0
	stateStatus: number = 0
	//0 initial
	//1 loading
	//2 verification start
	//3 verification pending
	//4 verification finished
	verificationDone: boolean = false
	verificationCode: string
	verificationId: string
	otpDialogContext: any
	closeResult: string
	codeSend: boolean = false

	countryCodeNameList = [
		"India +91",
		"US +1",
		"Canada +1",
		"Australia +61",
	]
	countryCodeList = ["+91", "+1", "+1", "+61"]
	countryCodeIndex = 0

	private recaptchaVerifier: firebaseApp.auth.RecaptchaVerifier
	private recaptchaResponseId: ""
	private signInResponse: any

	appointmentForm: FormGroup

	userModelSub: Subscription
	userModel: CustomerModel = null

	backToUpSub: Subscription

	routeSub: Subscription
	route: string

	authCheck: boolean

	loader: boolean = false
	dateCondtiontoday = new Date().toISOString().slice(0, 16)

	constructor(
		private modalService: NgbModal,
		private fb: FormBuilder,
		private db: AngularFirestore,
		private afAuth: AngularFireAuth,
		private toastr: ToastrService,
		private auth: AuthService,
		private loaderService: LoaderService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {
		this.authCheck = auth.authCheck

		afAuth.authState.subscribe((res) => {
			if (!res) {
				this.userModel == null
			}
		})
	}

	ngOnDestroy() {
		this.userModelSub.unsubscribe()
	}

	ngOnInit() {
		this.routeSub = this.router.events.subscribe((event) => {
			if (event instanceof NavigationStart) {
				this.route = event.url.slice(1, 13)
				// console.log(this.route);
			}
		})

		this.userModelSub = this.auth.userModelSubject.subscribe(
			(res) => {
				if (res != undefined) {
					this.userModel = res
					// console.log(this.userModel);
				}
			}
		)
	}

	routeToUserProfile(userId: string) {
		this.router.navigate(["/user-profile"], {
			queryParams: { id: userId },
		})
		this.modalService.dismissAll()
	}

	uploadingSoon() {
		this.toastr.info("Uploading Soon ... ")
		this.modalService.dismissAll()
	}

	routeToLogin() {
		this.router.navigate(["/login"])
		this.modalService.dismissAll()
	}

	async signout() {
		this.userModel == null
		this.loaderService.loader$.next(true)
		await this.auth.signOut()
		// this.userModelSub.unsubscribe();
		this.loaderService.loader$.next(false)
		// this.router.navigate(['/home'])
		// window.location.reload();
		// this.toastr.show("logged out")
	}

	openLoginModal(modal) {
		this.modalService.open(modal, { size: "md" })
	}

	openMenu(menuContent) {
		this.modalService.open(menuContent, { size: "sm" })
	}

	openAppointmentModal(appointmentContent) {
		this.appointmentForm = this.fb.group({
			apointmentId: this.db.createId(),
			customerName: [""],
			customerMobile: [""],
			customerAddress: [""],
			appointmentDate: [],
			createdOn: firebase.firestore.Timestamp.now(),
		})
		this.modalService.open(appointmentContent, { size: "md" })
	}

	saveAppointment(form: FormGroup) {
		this.loader = true

		let appointmentObj: Appointment = { ...form.value }
		this.db
			.collection("admins")
			.doc(environment.adminId)
			.collection("appointments")
			.doc(appointmentObj.appointmentId)
			.set(Object.assign({}, appointmentObj), { merge: true })
			.then(() => {
				this.loader = false
				this.modalService.dismissAll()
				this.toastr.success("Query Sent!")
			})
	}

	// dropDownOpen(id) {
	//   @ViewChild(id): ElementRef =  fileInput;
	//   console.log(id);
	//   let element: HTMLElement = document.getElementById(id) as HTMLElement;
	//   element.click();
	// }
}
