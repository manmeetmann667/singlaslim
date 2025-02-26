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
      type: "video",
      media: "../../../assets/images/IMG_8939.MOV", // Adjust image path as per your project structure
      description:
        "Let’s talk about something most people shy away from: the hidden struggles of obesity. It’s not just about weight—it’s about how it feels. Many people face a silent battle with the constant stares, whispers, and unsolicited advice. And that judgment? It doesn’t just hurt; it sticks. It can make you feel small, unworthy, and sometimes even hopeless. Here’s where it gets even trickier. Feeling low or depressed because of these social stigmas can actually make weight loss harder. Why? Depression disrupts your hormones, making your body hold onto weight—and if you’re on medications for depression, they can ramp up cravings for high-calorie, comforting foods. See the cycle? Weight gain feeds depression, depression feeds weight gain, and society’s judgment just adds fuel to the fire.",
      showFullDescription: false,
    },
    {
      type: "video",
      media: "../../../assets/images/IMG_9002.MOV", // Adjust video path as per your project structure
      description:
        "Investing in your health boosts your productivity at work, energy levels, confidence, and even relationships! Don’t let extra weight hold you back from living your best life.",
      showFullDescription: false,
    },
    {
      type: "video",
      media: "../../../assets/images/IMG_9007.MOV", // Adjust video path as per your project structure
      description:
        "Childhood obesity is no longer just a physical health issue—it is deeply affecting the mental well-being of our children. Studies show that overweight and obese children are more likely to struggle with low self-esteem, social anxiety, and even depression due to body shaming, bullying, and societal pressures.",
      showFullDescription: false,
    },
    {
      type: "video",
      media: "../../../assets/images/IMG_9012.MOV", // Adjust video path as per your project structure
      description:
        "Obesity & Depression: Symptoms of depression and how it leads to weight gain - Prevent it. Did you know that obesity and depression are deeply interconnected? One often leads to the other, creating a cycle that makes weight loss even harder. ❗ Common Symptoms of Obesity & Depression That Lead to Weight Gain: 🔹 Constant fatigue and low energy 🔹 Emotional eating or frequent cravings 🔹 Lack of motivation to exercise or stay active 🔹 Poor sleep quality or insomnia 🔹 Feelings of hopelessness, guilt, or stress 🔹 Hormonal imbalances that affect metabolism 🔹 Social withdrawal and low self-esteem. When mental health suffers, weight management becomes a challenge. And when weight increases, it further affects mental well-being. Breaking this cycle requires both physical and psychological intervention.",
      showFullDescription: false,
    },
    {
      type: "video",
      media: "../../../assets/images/IMG_9016.MOV", // Adjust video path as per your project structure
      description:
        "In this powerful episode of our podcast, we bring you the heart-wrenching yet incredibly inspiring journey of a young girl who fought her way out of darkness. At just 18, she weighed 142 kgs and faced relentless bullying, leading her to drop out of school after 12th. The emotional trauma pushed her into severe depression, and in her darkest moments, she attempted suicide three times. 💔 Her weight wasn’t just affecting her body—it was crushing her spirit. But her story doesn’t end there. With immense courage, resilience, and the right guidance, she turned her life around. Today, she has lost 72 kgs and is living a happy, confident, and fulfilling life! 🌟",
      showFullDescription: false,
    },
    {
      type: "video",
      media: "../../../assets/images/IMG_9028.MOV", // Adjust video path as per your project structure
      description:
        "If someone in your family is struggling with obesity, your support can make all the difference in their journey to health. Criticism, body shaming, or constant reminders of their weight don’t help—they only lead to stress, low self-esteem, and even depression. Instead of pointing out their flaws, be their strength. Encourage them with love, motivate them with kindness, and walk with them on their path to transformation.",
      showFullDescription: false,
    },
    {
      type: "video",
      media: "../../../assets/images/IMG_9191.MP4", // Adjust video path as per your project structure
      description:
        "Podcast: For every woman, health secrets by Dr. Anju Singla & Dr. Venus Bansal || OBESITY x GYNAE",
      showFullDescription: false,
    },
    {
      type: "video",
      media: "../../../assets/images/IMG_9242.MP4", // Adjust video path as per your project structure
      description:
        "When an obesity doctor and a gynecologist sit together, what do they talk about? 🤔 PCOD. A silent health issue that’s affecting countless women, yet so many still don’t understand it fully. 💡 Did you know? Obesity is one of the biggest triggers of PCOD (Polycystic Ovarian Disease)—but why? How does weight impact your hormones, periods, fertility, and overall health? And most importantly, what can you do about it?",
      showFullDescription: false,
    },
    {
      type: "video",
      media: "../../../assets/images/IMG_9265.MP4", // Adjust video path as per your project structure
      description:
        "A Must-Watch Discussion for Every Mom/Dad planning for a baby! 🌟 What if we told you that your weight today could shape your baby’s future? 🤯 Dr. Anju Singla, Obesity Doctor & Weight Loss Expert, and Dr. Venus Bansal, Leading Gynecologist from Clio Hospital, sit down for a powerful discussion on a topic that every woman must know.",
      showFullDescription: false,
    },
    {
      type: "image",
      media: "../../../assets/images/0e003c93-31b5-4d70-964c-7da6e27ad930.jpeg", // Adjust image path as per your project structure
      description:
        "Press View More for Full Podcast",
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
    if (blog.media === "../../../assets/images/0e003c93-31b5-4d70-964c-7da6e27ad930.jpeg") {
      // This is the podcast blog entry, so open the YouTube link directly
      window.open("https://youtu.be/w-kEA1H9UzY?si=XkhziD2gP45hHEEX", "_blank");
    } else {
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
  }
  
  // Function to handle toggling the description visibility
  toggleDescription(blog: any) {
    blog.showFullDescription = !blog.showFullDescription;
  }
}  