import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore/';
import { switchMap, flatMap, map, take, first, tap } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions/';
import { BehaviorSubject, empty, Observable, of, Subscription } from 'rxjs';
import firebaseApp from 'firebase/app';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

import { AuthInfo } from '../app/classes/authInfo';
import { LoaderService } from './loader.service';
import { ToastrService } from 'ngx-toastr';
import * as util from '../app/utils';
import { CustomerModel } from './classes/customerModel';
import firebase from 'firebase'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static context;
  userModel: CustomerModel = null;
  userModelSubject = new BehaviorSubject<CustomerModel>(null);
  userModelDub: Subscription;

  routeNameSubject = new BehaviorSubject<String>(null);
  routeName: string = "";

  userRetrieved: boolean = false;
  // firebaseUser: firebase.User;


  user$: Observable<AuthInfo>;

  backToUpScrollSubject = new BehaviorSubject<Number>(0);
  authCheck: boolean;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private http: HttpClient,
    private loaderService: LoaderService,
    private toastr: ToastrService,
    private router: Router,
    private functions: AngularFireFunctions) {

    AuthService.context = this;


    afAuth.authState.subscribe((res) => {
      if (res) {
        this.getUserFromDB(res.uid);
        console.log(res.uid);

        this.authCheck = true;
      }
      if (res == null) {
        this.authCheck = false;
        this.userModelSubject.next(null)
      }
    })

    // this.epicFunction();
    this.doSomething();

  }

  epicFunction() {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        console.log("in function");

        console.log(user);

        if (user) {
          // this.doSomething();
          // if (this.userModel == null) {
          this.getUserFromDB(user.uid);
          // this.updateUserLoginStatus(true, user.uid);
          // }
          return this.afAuth.idTokenResult;
        } else {
          this.userModel = null;
          this.userModelSubject.next(null);

          return of(null);
        }
      })
    );
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    })
  };

  async updateUserLoginStatus(loggedIn, uid) {
    return await this.db.collection(util.adminCollection)
      .doc(environment.adminId)
      .collection(util.customerCollection).doc(uid)
      .update({ "loggedIn": loggedIn });
  }


  get WindowRef() {
    return window;
  }





  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  isLoggedIn() {
    // console.log(this.afAuth.authState.pipe(first()).toPromise());

    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async doSomething() {
    const user = await this.isLoggedIn()
    if (user == null) {
      this.userModelSubject.next(null);
    } else {
      this.getUserFromDB(user.uid);
      // this.firebaseUser = user;
    }

  }

  async getUserPhoneFromDb(phone) {
    await this.db.collection(util.adminCollection).doc(environment.adminId).
      collection(util.customerCollection, ref => ref.where('mobile', '==', phone))
      .valueChanges().subscribe(async (list: CustomerModel[]) => {
        this.userModel = list[0];
        this.userModelSubject.next(list[0]);
      })

  }


  getUserFromDB(uid) {
    // console.log(uid);

    this.userModelDub = this.db.collection(util.adminCollection).doc(environment.adminId).
      collection(util.customerCollection, ref => ref.where('authId', '==', uid))
      .valueChanges().subscribe(async (list: CustomerModel[]) => {
        this.userModel = list[0];
        // console.log(this.userModel);

        this.userModelSubject.next(list[0]);
        // if(!this.userModel.isActive){
        // this.signOut();
        // this.toastr.error("Your account has been de-activated. Please contact admin for further information.")
        // }
      })
  }

  async signOut() {
    // await this.updateUserLoginStatus(false, this.userModel.customerId);
    this.afAuth.signOut().then(() => {
      this.userModelSubject.next(null);
      this.userModel = null;
      if (this.userModelDub != null) {
        this.userModelDub.unsubscribe();
      }
      this.loaderService.loader$.next(false)
      this.toastr.info("Logged Out")
      AuthService.context.router.navigate(['/home'])
      .then(() => {
        window.location.reload()
      });
    });
  }

  async registerUser(userFormValue, countryCode) {
    this.loaderService.loader$.next(true);

    const userModel = new CustomerModel;

    userModel.name = userFormValue.name;
    userModel.mobile = String(userFormValue.mobile);
    // userModel.ge = Number(userFormValue.gender);
    userModel.email = userFormValue.email;
    userModel.dob = firebase.firestore.Timestamp.fromDate(new Date(userFormValue.dob));
    userModel.status = true;
    userModel.signal = 0
    userModel.createdOn = firebaseApp.firestore.Timestamp.now();
    // userModel.token = "";

    if (userModel.name === "") {
      this.toastr.error("Invalid name");
      this.loaderService.loader$.next(true);
      return null;
    }
    if (userModel.mobile.length !== 10) {
      this.toastr.error("Invalid phone number1");
      this.loaderService.loader$.next(true);
      return null;
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userModel.email))) {
      this.toastr.error("Invalid email address");
      this.loaderService.loader$.next(false);
      return null;
    }

    const phoneExists = await this.userNumberExists(userModel.mobile, countryCode);
    if (phoneExists) {
      // console.log('number already exists');
      this.loaderService.loader$.next(false);
      this.toastr.info(userModel.mobile + " phone number already exists. Please try another one.")
      return null;
    }

    const emailExists = await this.userEmailExists(userModel.email);
    if (emailExists) {
      // console.log('Email already exists');
      this.loaderService.loader$.next(false);
      this.toastr.info(userModel.email + " address already exists. Please try another one.")
      return null;
    }
    return { "userModel": userModel, "emailExists": emailExists, "phoneExists": phoneExists };

  }

  async userNumberExists(number: string, countryCode: string) {
    const exist = await this.db
      .collection(util.adminCollection).doc(environment.adminId)
      .collection<CustomerModel>(util.customerCollection, ref => (ref.where('mobile', '==', number)
      )).
      valueChanges().pipe(map(data => {
        // console.log(data);
        if (data.length > 0) {
          if (data[0].status) {
            return 2;
          } else {
            return 1;
          }

        } else {
          return 0;
        }
      }), take(1)).toPromise();

    return exist;
  }

  async initAuthId(uid, phone) {
    
    await this.db.collection(util.adminCollection).doc(environment.adminId).
      collection(util.customerCollection, ref => ref.where('mobile','==',phone))
      .get().toPromise()
      .then(async (list) => {
        this.userModel = Object.assign({}, list.docs[0].data() as CustomerModel) ;
        console.log(this.userModel);
        
        this.userModel.authId = uid
        this.db.collection(util.adminCollection).doc(environment.adminId)
          .collection<CustomerModel>(util.customerCollection).doc(this.userModel.customerId)
          .set(this.userModel, { merge: true })        
        this.userModelSubject.next(list[0]);
      })
      

  }

  async userEmailExists(email: string) {
    const exist = await this.db.collection(util.adminCollection).doc(environment.adminId)
      .collection<CustomerModel>(util.customerCollection, ref => (ref.where('email', '==', email))).
      valueChanges().pipe(map(data => {
        this.userModel = data[0]


        if (data.length > 0) {
          return true;
        } else {
          return false;
        }
      }), take(1)).toPromise();

    return exist;
  }

  authenticateEmployee(mobile: string, email: string, phoneExists: boolean, emailExists: boolean): Observable<any> {
    try {
      const authEmp = this.functions.httpsCallable('CreateUser');
      return authEmp({ 'phone': mobile, 'email': email, 'phoneExists': phoneExists, 'emailExists': emailExists });
    } catch (error) {
      console.log(error);
      return of(error);

    }


  }



  // getPurachedCourses(userId: string) {
  //   if (!this.paymentModelRetrieved) {
  //     this.paymentModelRetrieved = false;
  //     this.db.collection("userCollection").doc(userId)
  //       .collection("paymentCollection"
  //         , ref => ref
  //           .where("transactionStatus", "==", 1)
  //           .orderBy("createdOn")
  //       ).valueChanges().subscribe(
  //         (paymentModelList: PaymentModel[]) => {
  //           this.paymentModelSubject.next(paymentModelList);
  //         });
  //   }
  // }








}