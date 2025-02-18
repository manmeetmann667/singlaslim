import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Images } from '../classes/images';
import { Videos } from '../classes/video';
import * as util from '../utils'

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {

  imagesList: Images[] = [];

  videosList: Videos[] = [];
  videoUrl: string;
 
  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getImages();
    this.getVideos();
  }

  openViewVideoModal(modal, videoUrl: string) {
    this.modalService.open(modal, { size: "lg" });
    this.videoUrl = videoUrl;
  }


  getImages() {
    this.db
    .collection(util.adminCollection)
    .doc(environment.adminId)
    .collection(util.imagesCollection, (ref) =>
        ref.orderBy("createdOn", "desc")
      )
      .get().toPromise()
      .then((response) => {
        if (response.docs.length != 0) {
          response.docs.forEach((ele, idx) => {
            let sliderbj: Images = Object.assign(
              {},
              ele.data() as Images
            );
            this.imagesList.push(sliderbj);
            // this.data.sliderLastDocs.next(ele);
          });
          console.log(this.imagesList);
          
          // this.data.sliderSub.next(this.sliderImagesList);
        }
      });
  }

  getVideos(){
    this.db
    .collection(util.adminCollection)
    .doc(environment.adminId)
    .collection(util.videosCollection, (ref) =>
        ref.orderBy("createdOn", "desc")
      )
      .get().toPromise()
      .then((response) => {
        if (response.docs.length != 0) {
          response.docs.forEach((ele, idx) => {
            let videoObj: Videos = Object.assign(
              {},
              ele.data() as Videos
            );
            this.videosList.push(videoObj);
          
          });
          console.log(this.imagesList);
          
          
        }
      });
  }

}
