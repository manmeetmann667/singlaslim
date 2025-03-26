import {
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from "@angular/core"

@Component({
	selector: "app-video-silder",
	templateUrl: "./video-silder.component.html",
	styleUrls: ["./video-silder.component.css"],
})
export class VideoSilderComponent implements OnInit {
	@ViewChild("videoTrack") videoTrack!: ElementRef

	videoList: string[] = [
		"assets/images/SSC.mp4",
		"assets/images/SSC_1.mp4",
	]

	ngAfterViewInit() {
		this.duplicateVideos()
	}

	duplicateVideos() {
		const track = this.videoTrack.nativeElement
		track.innerHTML += track.innerHTML // Duplicate for seamless scroll
	}

	constructor() {}

	ngOnInit(): void {}
}
