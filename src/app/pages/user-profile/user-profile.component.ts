import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { CustomerModel } from 'src/app/classes/customerModel';
import * as util from '../../utils';
import firebase from 'firebase'
import { environment } from 'src/environments/environment';
import { HealthLog } from 'src/app/classes/healthLog';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/loader.service';
import { Diet } from 'src/app/classes/diet';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  activatedRouteSub: Subscription;

  userModel: CustomerModel;
  userModelSub: Subscription;
  customerId: string;

  pageBool: number = 0;

  healthLogList: HealthLog[] = [];

  weight: string = ''; 

  dietsList: Diet[] = [];
  selectedDietModel: Diet;

  constructor(
    private db: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private toastrService: ToastrService,
    private loaderService: LoaderService,
    private modalService: NgbModal
  ) {
    this.pageBool = 0;
   }

  ngOnInit(): void {
    
    this.activatedRouteSub = this.activatedRoute.queryParams.subscribe((res) => {
      this.customerId = res['id'];
      this.auth.getUserFromDB(this.customerId);
      this.getHealthLogs();
      this.getDietList();

      
    })
    
    this.userModelSub = this.auth.userModelSubject.subscribe((data) => {
      if(data != null){
        this.userModel = data;

        
      }
    })
  }

  getHealthLogs(){
    this.db.collection(util.adminCollection).doc(environment.adminId)
    .collection(util.customerCollection).doc(this.customerId)
    .collection(util.healthLogCollection, ref => ref.orderBy('createdOn','desc'))
    .valueChanges()
    .subscribe((list: HealthLog[]) => {
      this.healthLogList = list;
      // console.log(this.healthLogList);
      
    })
  }


  getDietList(){
    this.db.collection(util.adminCollection).doc(environment.adminId)
    .collection(util.customerCollection).doc(this.customerId)
    .collection(util.customerDietsCollection, ref => ref.orderBy('createdOn','desc'))
    .valueChanges()
    .subscribe((list: Diet[]) => {
      this.dietsList = list;
      // console.log(this.dietsList);
      
    })
  }

  logWeight(){
    if(this.weight == ''){
      this.toastrService.info('Please fill out the Weight field')
    } else {
      this.loaderService.loader$.next(true);

      let healthLogObj: HealthLog = new HealthLog();

      healthLogObj.logId = this.db.createId();
      healthLogObj.customerId = this.userModel.customerId;
      healthLogObj.customerName = this.userModel.name;
      healthLogObj.signal = 0;
      healthLogObj.weight = this.weight;
      healthLogObj.createdOn = firebase.firestore.Timestamp.now();

      this.db.collection(util.adminCollection).doc(environment.adminId)
      .collection(util.customerCollection).doc(healthLogObj.customerId)
      .collection(util.healthLogCollection).doc(healthLogObj.logId)
      .set(Object.assign({}, healthLogObj), {merge: true})
      .then(() => {
        this.loaderService.loader$.next(false);
        this.toastrService.success('Weight Logged !')
      })
    }
  }

  changePageBool(value: number){
    this.pageBool = value;
    console.log(value);
  }

  openDietModal(modal, dietObj: Diet){
    this.selectedDietModel = dietObj;
    this.modalService.open(modal, {size: 'md'})
  }

  logOut(){
    this.loaderService.loader$.next(true)
    this.auth.signOut();
    this.userModel = null;
    this.userModelSub.unsubscribe();
  }
}
