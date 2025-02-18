import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { CustomerModel } from 'src/app/classes/customerModel';
import { News } from 'src/app/classes/news';
import { sliderImages } from 'src/app/classes/slider';
import { environment } from 'src/environments/environment';
import * as util from '../../utils'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images: string[] = [
    '../assets/images/slider-1.png',
  ]


  sliderImagesList: sliderImages[] = [];
  sliderImagesListSubject = new BehaviorSubject<sliderImages[]>(null)

  newsList: News[] = [];

  // userModel: CustomerModel
  // userModelSub: Subscription;


  constructor(private db: AngularFirestore,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.getSliderImages();
    this.getNews();

    // this.userModelSub = this.auth.userModelSubject.subscribe((res) => {
    //   console.log(res);

    //   if(res != null){
    //     this.userModel = res;
    //     console.log(this.userModel);
    //   }
    // })

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
        if (response.docs.length != 0) {
          response.docs.forEach((ele, idx) => {
            let sliderbj: sliderImages = Object.assign(
              {},
              ele.data() as sliderImages
            );
            this.sliderImagesList.push(sliderbj);
            // this.data.sliderLastDocs.next(ele);
          });
          console.log(this.sliderImagesList);

          // this.data.sliderSub.next(this.sliderImagesList);
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
        if (response.docs.length != 0) {
          response.docs.forEach((ele, idx) => {
            let newsObj: News = Object.assign(
              {},
              ele.data() as News
            );
            this.newsList.push(newsObj);
            // this.data.sliderLastDocs.next(ele);
          });
          console.log(this.newsList);

          // this.data.sliderSub.next(this.sliderImagesList);
        }
      });
  }
}
