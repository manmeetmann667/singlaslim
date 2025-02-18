import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerModel } from '../classes/customerModel';
import firebaseApp from 'firebase';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../loader.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { adminCollection, customerCollection } from '../utils';
import { environment } from 'src/environments/environment';
import firebase from 'firebase'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  userVerificationForm: FormGroup;
  currentDate: Date = new Date();
  stateStatus: number = 0;
  //0 initial
  //1 loading
  //2 verification start
  //3 verification pending
  //4 verification finished
  verificationDone: boolean = false;
  userModel: CustomerModel = new CustomerModel();
  verificationCode: string;
  verificationId: string;
  closeResult: string;
  otpDialogContext: any;
  recPhoneNumber: string = ""

  private recaptchaVerifier: firebaseApp.auth.RecaptchaVerifier;
  private recaptchaResponseId: "";
  private signInResponse: any;

  paramMapSub: Subscription;
  countryCodeNameList = ["India +91"];
  countryCodeList = ["+91"];
  countryCodeIndex = 0;


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private modalService: NgbModal,
    private authService: AuthService
  ) { }
  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openOTPDialog() {
    this.modalService.open(this.otpDialogContext, { ariaLabelledBy: 'modal-basic-title', size: 'sm', backdrop: 'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ngOnInit() {
    var date = new Date();//.toISOString().substring(0, 10)
    date.setFullYear(date.getFullYear() - 18);

    this.paramMapSub = this.route.paramMap.subscribe(async params => {
      this.recPhoneNumber = params['params']['phone'];
    });
    this.userForm = this.fb.group({
      name: ["", Validators.required],
      gender: [0, Validators.required],
      mobile: [this.recPhoneNumber, [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      countryCode: [0, [Validators.required, Validators.email]],
      otp: ["", [Validators.required, Validators.email]],
      dob: [date.toISOString().substring(0, 10), Validators.required],
    });
    this.userVerificationForm = this.fb.group({
      code: ["", Validators.required],
    });

    // this.authService.userModelSubject.subscribe(data => {
    //     if (data != null) {
    //         this.router.navigate(['/']);
    //         this.authService.doSomething();
    //     }
    // })
    this.codeInit();

  }

  ngOnDestroy() {
    this.paramMapSub.unsubscribe();
  }

  codeInit() {
    try {
      this.recaptchaVerifier = new firebaseApp.auth.RecaptchaVerifier('recaptcha-container-sign-up', {
        'size': 'normal',
        'callback': response => {
          this.recaptchaResponseId = response;
        }, 'expired-callback': () => {
          console.log("Response expired. Ask user to solve reCAPTCHA again.");

        }
      });
      this.recaptchaVerifier.render();
    } catch (e) {
      // console.log(e);
      this.codeInit();

    }


  }

  sendInit() {
    this.sendLoginCode();
  }

  sendLoginCode() {
    const appVerifier = this.recaptchaVerifier;
    const num = this.countryCodeList[this.countryCodeIndex] + this.userModel.mobile;

    firebaseApp.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.signInResponse = result;
        this.recaptchaVerifier.clear();
        this.verificationId = result.verificationId;
        this.stateStatus = 2;
        // console.log(this.firstOrSecondForm);
        this.loaderService.loader$.next(false);
        // this.openOTPDialog();

      })
      .catch(error => {
        this.loaderService.loader$.next(false);
        this.toastr.error("Something went wrong. Please try again later.");
        // console.log(error)
      });

  }

  verifyLoginCode(successDialogContext) {
    this.loaderService.loader$.next(true);
    this.signInResponse
      .confirm(this.userForm.value.otp)
      .then(result => {
        // this.userModel.authId = result.uid;
        this.userModel.name = this.userForm.value.name;
        this.userModel.email = this.userForm.value.email;
        this.userModel.mobile = this.userForm.value.mobile;
        this.userModel.adminId = environment.adminId;
        this.userModel.points = 100;
        this.userModel.signal = 0;
        this.userModel.status = true;
        this.userModel.createdOn = firebase.firestore.Timestamp.now();

        this.db.collection(adminCollection).doc(environment.adminId)
          .collection(customerCollection).doc(this.userModel.customerId)
          .set(Object.assign({}, this.userModel), { merge: true })
          .then(() => {
            this.modalService.dismissAll();
            // this.toastr.success('Registered Successfully')
            // this.router.navigate(['/home'])


          })

        this.modalService.dismissAll();
        this.loaderService.loader$.next(false);
        this.modalService.open(successDialogContext, { ariaLabelledBy: 'modal-basic-title', size: 'sm', backdrop: 'static' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        setTimeout(() => {
          this.modalService.dismissAll();
          this.router.navigate(['/']);
        }, 500);

      })
      .catch(error => {
        console.log(error, "Incorrect code entered?");
        this.toastr.error("You have entered incorrect OTP. Please enter a correct one.", "Errpr")
        this.loaderService.loader$.next(false);

      });
  }


  async onSubmit(otpDialogContext, successDialogContext) {
    this.otpDialogContext = otpDialogContext;

    if (this.stateStatus == 2) {
      this.verifyLoginCode(successDialogContext)
    } else {
      this.stateStatus = 1;
      var resultObj = {};
      // console.log(this.userForm.value);
      if (this.userForm.value.mobile.length !== 10) {
        this.toastr.error("Invalid phone number");
        this.stateStatus = 0;
        this.modalService.dismissAll();
        return null;
      } else if (this.recaptchaResponseId == undefined) {
        this.toastr.error("Verification failed");
        this.stateStatus = 0;
        this.modalService.dismissAll();
        this.recaptchaVerifier.render();
        return null;
      }
      resultObj = await this.authService.registerUser(this.userForm.value, this.countryCodeList[this.countryCodeIndex]);
      if (resultObj == null) {
        this.stateStatus = 0;
        this.modalService.dismissAll();
        return;
      }
      else {

        resultObj['userModel'].customerId = this.db.createId();
        // resultObj['userModel'].authId = this.db.createId();
        // resultObj['userModel'].countryCode = this.countryCodeList[this.countryCodeIndex];
        // resultObj['userModel'].countryCodeName = this.countryCodeNameList[this.countryCodeIndex];
        this.userModel = resultObj['userModel'];

        await this.db.firestore.collection(adminCollection).doc(environment.adminId).collection(customerCollection).doc(resultObj['userModel'].customerId)
          .set(Object.assign({}, resultObj['userModel']));
        this.stateStatus = 2;
        setTimeout(() => {
          this.sendInit();
        }, 500);

      }
    }
    error => {
      console.log(error);
      this.toastr.error("Something went wrong. Please contact development team.");
      this.modalService.dismissAll();
      return false;
    };
}

countryCodeFun(i) {
  this.countryCodeIndex = i;
}

}