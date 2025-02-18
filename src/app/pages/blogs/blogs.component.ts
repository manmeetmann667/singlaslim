import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Blog } from 'src/app/classes/blog';
import { environment } from 'src/environments/environment';
import * as util from '../../utils'
import { LoaderService } from 'src/app/loader.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  blogsList: any[] = [];

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.db
      .collection(util.adminCollection)
      .doc(environment.adminId)
      .collection(util.blogsCollection, (ref) => ref.where("blogStatus",'==',true).orderBy("addedOn", "desc"))
      .get()
      .toPromise()
      .then((response) => {
        if (response.docs.length != 0) {
          response.docs.forEach((ele, idx) => {
            let blogbj: Blog = Object.assign({}, ele.data() as Blog);
            this.blogsList.push(blogbj);
            // this.data.sliderLastDocs.next(ele);
          });
          console.log(this.blogsList);

          // this.data.sliderSub.next(this.sliderImagesList);
        }
      });
  }

  listBlogs(id) {
    console.log(id);
    this.router.navigate(["/blogsList", id]);
  }


}
