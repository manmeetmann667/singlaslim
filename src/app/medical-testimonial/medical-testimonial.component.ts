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
		{
			type: "video",
			media: "../../../assets/images/SSC_2.mp4",
			description:
				"A Life-Changing Transformation. Mr. Aditya lost 10 kg in just 3 months with Singla Slimming Clinic—all through online Zoom meetings and phone calls! His journey not only helped him shed weight but also motivated him to hit the gym. The best part? He still enjoys his favorite sweets and fried foods while staying on track.Ready to transform your health effortlessly? Book your appointment today!",
		},
		{
			type: "video",
			media: "../../../assets/images/SSC_3.mp4",
			description:
				"A Life-Changing Transformation.Mrs. Sonia joined Singla Slimming Clinic, Zirakpur, just a month ago and has already lost 5-6 kg. Not only is she thrilled with her results, but her medical issues have also been resolved. Today, she feels fit, healthy, and full of energy! Ready to start your own transformation? Book your appointment now!",
		},
		{
			type: "video",
			media: "../../../assets/images/SSC_4.mp4",
			description:
				"Struggling with obesity and its related issues? From dull skin to a radiant glow, PCOD resolved, and energy levels soaring all day—she transformed completely! Now fit, fine, and thriving. Ready to start your journey? Book your appointment today!",
		},
		{
			type: "video",
			media: "../../../assets/images/SSC_5.mp4",
			description:
				"I was struggling with knee pain, and my doctor advised surgery. On top of that, my body would swell every time I ate wheat flour. But after joining this program, I lost 13 kg and feel completely fit and fine now. My knee pain is gone, and my body feels better than ever. If you're struggling with similar issues, I highly recommend booking an appointment – it’s truly life-changing!   – Mrs. Ravinder Kaur",
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
