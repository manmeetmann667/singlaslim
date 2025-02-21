import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
} from "@angular/core"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"

@Component({
	selector: "app-medical-testimonial",
	templateUrl: "./medical-testimonial.component.html",
	styleUrls: ["./medical-testimonial.component.css"],
})
export class MedicalTestimonialComponent implements OnInit {
	@ViewChild("videoPlayer") videoPlayer!: ElementRef // Get reference to video element

	constructor(private modalService: NgbModal) {}

	ngOnInit(): void {}

	testimonials = [
		{
			type: "image",
			media: "../../../assets/images/IMG_9255.JPG",
			description:
				"I can't believe the transformation! In just 10 weeks with Singla Slimming Clinic’s online program, I lost 9 kgs and regained my health. My BP, acidity, skin issues, and cholesterol are now completely under control.",
		},
		{
			type: "video",
			media: "../../../assets/images/IMG_7369.MP4",
			description:
				"Mrs. Suman found us through social media while struggling with severe weight-related issues at 145 kg. Determined to take control of her health, she joined our program and lost 12 kg in just 1 month!",
		},
		{
			type: "video",
			media: "../../../assets/images/SSC.mp4",
			description:
				"Mr. Satpal Singh from Ludhiana discovered us through social media, struggling with obesity and low energy. In just 2 months, he lost 15 kg, regained his health, and now feels more energized than ever!",
		},
	]

	modalImage: string = ""
	modalDescription: string = ""
	isImage: boolean = false
	isVideo: boolean = false

	// **Updated Function to Play Video Automatically**
	openModal(content: any, testimonial: any) {
		this.modalImage = testimonial.media
		this.modalDescription = testimonial.description
		this.isImage = testimonial.type === "image"
		this.isVideo = testimonial.type === "video"

		this.modalService.open(content, { centered: true }).result.then(
			() => {
				// Stop video when modal is closed
				if (this.videoPlayer) {
					this.videoPlayer.nativeElement.pause()
				}
			},
			() => {
				// Stop video if modal is dismissed
				if (this.videoPlayer) {
					this.videoPlayer.nativeElement.pause()
				}
			}
		)

		// Wait for Angular to render the video before playing
		setTimeout(() => {
			if (this.videoPlayer && this.isVideo) {
				this.videoPlayer.nativeElement.play()
			}
		}, 500) // Small delay to ensure the modal renders first
	}
}
