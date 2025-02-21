import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { CustomerModel } from 'src/app/classes/customerModel';
import { News } from 'src/app/classes/news';
import { sliderImages } from 'src/app/classes/slider';
import { environment } from 'src/environments/environment';
import * as util from '../../utils';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images: string[] = [
    '../assets/images/slider-1.png',
  ];

  sliderImagesList: sliderImages[] = [];
  sliderImagesListSubject = new BehaviorSubject<sliderImages[]>(null);

  newsList: News[] = [];

  gender: string = 'male';  // Default gender
  weight: number;  // User's input weight
  height: number;  // User's input height in inches
  idealWeight: number = null;  // To store the calculated ideal weight

  constructor(private db: AngularFirestore, 
              private auth: AuthService, 
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getSliderImages();
    this.getNews();
  }

  openModal() {
    this.modalService.open('weightCalculatorModal');  // Open the modal
  }

  calculateIdealWeight() {
    // Logic for calculating the ideal weight
    if (this.gender === 'male') {
      this.idealWeight = (this.height - 60) * 1;  // 1kg per inch for males
    } else if (this.gender === 'female') {
      this.idealWeight = (this.height - 60) * 0.9;  // 0.9kg per inch for females
    }

    // Convert the result to two decimal places
    this.idealWeight = Math.round(this.idealWeight * 100) / 100;

    // Close modal after calculation (Optional)
    this.modalService.dismissAll();
  }

  getSliderImages() {
    this.db
      .collection(util.adminCollection)
      .doc(environment.adminId)
      .collection(util.sliderImages, (ref) =>
        ref.where("active", "==", true)
          .orderBy("createdOn", "desc")
      )
      .get().toPromise()
      .then((response) => {
        if (response.docs.length !== 0) {
          response.docs.forEach((ele) => {
            let sliderbj: sliderImages = Object.assign({}, ele.data() as sliderImages);
            this.sliderImagesList.push(sliderbj);
          });
        }
      });
  }

  getNews() {
    this.db
      .collection(util.adminCollection)
      .doc(environment.adminId)
      .collection(util.newsCollection, (ref) =>
        ref.orderBy("createdOn", "desc")
      )
      .get().toPromise()
      .then((response) => {
        if (response.docs.length !== 0) {
          response.docs.forEach((ele) => {
            let newsObj: News = Object.assign({}, ele.data() as News);
            this.newsList.push(newsObj);
          });
        }
      });
  }
}
