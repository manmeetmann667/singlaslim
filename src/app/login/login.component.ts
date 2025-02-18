import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import firebaseApp from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  phoneForm: FormGroup;
  userVerificationForm: FormGroup;
  currentDate: Date = new Date();
  firstOrSecondForm: number = 0;
  stateStatus: number = 0;
  //0 initial
  //1 loading
  //2 verification start
  //3 verification pending
  //4 verification finished
  verificationDone: boolean = false;
  verificationCode: string;
  verificationId: string;
  otpDialogContext: any;
  closeResult: string;
  codeSend: boolean = false;

  countryCodeNameList = ["India +91", "US +1", "Canada +1", "Australia +61"];
  countryCodeList = ["+91", "+1", "+1", "+61"];
  countryCodeIndex = 0;

  private recaptchaVerifier: firebaseApp.auth.RecaptchaVerifier;
  private recaptchaResponseId: "";
  private signInResponse: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth,
    private modalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit() {
    this.phoneForm = this.fb.group({
      phone: ["", Validators.required],
      countryCode: [0, Validators.required],
      otp: ["", Validators.required],
    });
    this.userVerificationForm = this.fb.group({
      code: ["", Validators.required],
    });
    this.codeInit();
  }


  openOTPDialog() {
    this.codeSend = false;
    this.modalService.open(this.otpDialogContext, { ariaLabelledBy: 'modal-basic-title', size: 'sm', backdrop: 'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      this.codeInit();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  async onSubmit(otpDialogContext, loginAlertDialogContext, successDialogContext) {

    if (this.stateStatus == 2) {
      if (this.phoneForm.value.otp.length !== 6) {
        this.toastr.error("Invalid One Time Password");
      } else {
        this.verifyLoginCode(successDialogContext);
      }
    } else {
      this.codeSend = true;

      this.otpDialogContext = otpDialogContext;
      this.stateStatus = 1;

      if (this.phoneForm.value.phone.length !== 10) {
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
      } else {
        var result = await this.authService.userNumberExists(this.phoneForm.value.phone, this.countryCodeList[this.countryCodeIndex]);
        if (result == 1 || result == 2) {
          // console.log("result: "+result);          
          this.stateStatus = 2;
          setTimeout(() => {
            this.sendInit();
          }, 500);
        }
        else if (result == 2) {
          this.modalService.open(loginAlertDialogContext, { ariaLabelledBy: 'modal-basic-title', size: 'sm', backdrop: 'static', centered: true, }).result.then((result) => {
            // this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.router.navigate(["/home",]);
            // window.location.reload();
          });
        }
        else {
          this.toastr.info("Phone number not registered with Trebha.");
          this.stateStatus = 0;
          this.modalService.dismissAll();
          // this.router.navigate(["/regisxwter", this.phoneForm.value.phone]);

        }


      }
    }
  }

  sendInit() {
    this.sendLoginCode();
  }




  codeInit() {
    this.recaptchaVerifier = new firebaseApp.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      'callback': response => {
        this.recaptchaResponseId = response;
      }, 'expired-callback': () => {
        console.log("Response expired. Ask user to solve reCAPTCHA again.");

      }
    });
    this.recaptchaVerifier.render();
  }

  async sendLoginCode() {
    const appVerifier = this.recaptchaVerifier;
    const num = this.countryCodeList[this.countryCodeIndex] + this.phoneForm.value.phone;
    // await this.angularFireAuth.setPersistence(firebaseApp.auth.Auth.Persistence.LOCAL);
    // firebaseApp.auth().setPersistence(firebaseApp.auth.Auth.Persistence.LOCAL);
    firebaseApp.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.codeSend = true;
        this.signInResponse = result;
        this.recaptchaVerifier.clear();
        this.verificationId = result.verificationId;
        this.stateStatus = 2;
        // console.log(this.firstOrSecondForm);
        // this.openOTPDialog();

      })
      .catch(error => {
        // console.log("error");
        // console.log(error);
      });

  }

  async verifyLoginCode(successDialogContext) {
    this.loaderService.loader$.next(true);
    this.codeSend = true;
    this.signInResponse
      .confirm(this.phoneForm.value.otp)
      .then(async (result) => {
        // console.log(result);
        // await this.authService.getUserPhoneFromDb(this.phoneForm.value.phone)
        this.angularFireAuth.authState.subscribe((res) => {
          if(res){
            console.log(res.uid);
            console.log(this.phoneForm.value.phone);
            
            this.authService.initAuthId(res.uid, this.phoneForm.value.phone)
          }
        })
        this.modalService.dismissAll();
        this.loaderService.loader$.next(false);
        // await this.authService.updateUserLoginStatusFun(true);
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
        // console.log(error, "Incorrect code entered?");
        this.toastr.error("You have entered incorrect OTP. Please enter a correct one.")
        this.loaderService.loader$.next(false);

      });
  }

  countryCodeFun(i) {
    this.countryCodeIndex = i;
  }

}
