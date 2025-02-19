import { Component, OnInit, OnDestroy } from "@angular/core"
import { AngularFirestore } from "@angular/fire/firestore"
import { DomSanitizer } from "@angular/platform-browser"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"
import { environment } from "src/environments/environment"
import { Images } from "../classes/images"
import { Videos } from "../classes/video"
import * as util from "../utils"

@Component({
	selector: "app-photo-gallery",
	templateUrl: "./photo-gallery.component.html",
	styleUrls: ["./photo-gallery.component.css"],
})
export class PhotoGalleryComponent implements OnInit, OnDestroy {
	images: string[] = []
	imageGroups: string[][] = [] // Stores images in groups of 4
	currentIndex: number = 0
	intervalId: any
	excludedImages = [7, 8, 10, 11, 17, 22, 26] // List of missing images
	imagesList: Images[] = []
	videosList: Videos[] = []
	videoUrl: string
	isExpanded = {} // To track the expanded state of each video description

	constructor(
		private db: AngularFirestore,
		private modalService: NgbModal,
		private sanitizer: DomSanitizer
	) {}

	ngOnInit(): void {
		this.getImages()
		this.getVideos()
		for (let i = 7; i <= 37; i++) {
			if (!this.excludedImages.includes(i)) {
				this.images.push(`IMG-20250210-WA00${i}.jpg`)
			}
		}

		for (let i = 0; i < this.images.length; i += 4) {
			this.imageGroups.push(this.images.slice(i, i + 4))
		}

		this.startSlider()
	}

	openViewVideoModal(modal, videoUrl: string) {
		this.modalService.open(modal, { size: "lg" })
		this.videoUrl = videoUrl
	}

	getImages() {
		this.db
			.collection(util.adminCollection)
			.doc(environment.adminId)
			.collection(util.imagesCollection, (ref) =>
				ref.orderBy("createdOn", "desc")
			)
			.get()
			.toPromise()
			.then((response) => {
				if (response.docs.length != 0) {
					response.docs.forEach((ele, idx) => {
						let sliderbj: Images = Object.assign(
							{},
							ele.data() as Images
						)
						this.imagesList.push(sliderbj)
					})
				}
			})
	}

	getVideos() {
		this.db
			.collection(util.adminCollection)
			.doc(environment.adminId)
			.collection(util.videosCollection, (ref) =>
				ref.orderBy("createdOn", "desc")
			)
			.get()
			.toPromise()
			.then((response) => {
				if (response.docs.length != 0) {
					response.docs.forEach((ele, idx) => {
						let videoObj: Videos = Object.assign(
							{},
							ele.data() as Videos
						)
						this.videosList.push(videoObj)
					})
				}
			})
	}

	ngOnDestroy(): void {
		if (this.intervalId) {
			clearInterval(this.intervalId)
		}
	}

	startSlider(): void {
		this.intervalId = setInterval(() => {
			this.next()
		}, 2000)
	}

	next(): void {
		this.currentIndex =
			(this.currentIndex + 1) % this.imageGroups.length
	}

	toggleReadMore(title: string): void {
		this.isExpanded[title] = !this.isExpanded[title]
	}
}
