import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-blog",
  templateUrl: "./blogs.component.html",
  styleUrls: ["./blogs.component.css"],
})
export class BlogsComponent implements OnInit {
  @ViewChild("videoPlayer") videoPlayer!: ElementRef; // Get reference to video element

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  // Defining the blogs list
  blogs = [
    {
      type: "image",
      media: "../../../assets/images/IMG_9255.JPG", // Adjust image path as per your project structure
      description:
        "In our latest blog, we dive into the transformative power of healthy living, discussing the importance of balanced nutrition and exercise for long-term wellness.",
      showFullDescription: false,
    },
    {
      type: "video",
      media: "../../../assets/images/IMG_7369.MP4", // Adjust video path as per your project structure
      description:
        "Join us for an in-depth look at our health strategies that have helped thousands of individuals achieve their fitness goals and maintain a healthy lifestyle.",
      showFullDescription: false,
    },
    {
      type: "video",
      media: "../../../assets/images/SSC.mp4", // Adjust video path as per your project structure
      description:
        "Learn how small but effective lifestyle changes have led to impressive transformations. This blog provides tips on how to stay consistent and motivated in your fitness journey.",
      showFullDescription: false,
    },
    {
      type: "video",
      media: "../../../assets/images/SSC_2.mp4", // Adjust video path as per your project structure
      description:
        "Take a deeper dive into the benefits of proper nutrition and how it contributes to overall health. This video explains how eating the right food can boost energy and help you lose weight.",
      showFullDescription: false,
    },
    // Add more blogs as needed...
  ];

  modalImage: string = "";
  modalDescription: string = "";
  isImage: boolean = false;
  isVideo: boolean = false;

  // Function to handle modal opening and video autoplay
  openModal(content: any, blog: any) {
    this.modalImage = blog.media;
    this.modalDescription = blog.description;
    this.isImage = blog.type === "image";
    this.isVideo = blog.type === "video";

    this.modalService.open(content, { centered: true }).result.then(
      () => {
        // Stop video when modal is closed
        if (this.videoPlayer) {
          this.videoPlayer.nativeElement.pause();
        }
      },
      () => {
        // Stop video if modal is dismissed
        if (this.videoPlayer) {
          this.videoPlayer.nativeElement.pause();
        }
      }
    );

    // Wait for Angular to render the video before playing
    setTimeout(() => {
      if (this.videoPlayer && this.isVideo) {
        this.videoPlayer.nativeElement.play();
      }
    }, 500); // Small delay to ensure the modal renders first
  }

  // Function to handle toggling the description visibility
  toggleDescription(blog: any) {
    blog.showFullDescription = !blog.showFullDescription;
  }
}
