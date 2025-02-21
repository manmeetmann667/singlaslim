import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire'
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { OurMembersComponent } from './our-members/our-members.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { HydraFacialComponent } from './hydra-facial/hydra-facial.component';
import { AboutCompanyComponent } from './about-company/about-company.component';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PhotoFacialComponent } from './pages/photo-facial/photo-facial.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { LoaderComponent } from './pages/loader/loader.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { StitchesmarkRemovalComponent } from './pages/stitchesmark-removal/stitchesmark-removal.component';
import { BreastLiftingComponent } from './pages/breast-lifting/breast-lifting.component';
import { SkinRejuvenationComponent } from './pages/skin-rejuvenation/skin-rejuvenation.component';
import { SaggyskinTreatmentComponent } from './pages/saggyskin-treatment/saggyskin-treatment.component';
import { SkinTighteningComponent } from './pages/skin-tightening/skin-tightening.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { MedicalTestimonialComponent } from './medical-testimonial/medical-testimonial.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    PhotoGalleryComponent,
    OurMembersComponent,
    TestimonialsComponent,
    HydraFacialComponent,
    AboutCompanyComponent,
    LoginComponent,
    RegisterComponent,
    PhotoFacialComponent,
    UserProfileComponent,
    LoaderComponent,
    BlogsComponent,
    
    StitchesmarkRemovalComponent,
    BreastLiftingComponent,
    SkinRejuvenationComponent,
    SaggyskinTreatmentComponent,
    SkinTighteningComponent,
    SafeUrlPipe,
    MedicalTestimonialComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: false,
    }),
  ],
  providers: [NavbarComponent
  ,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
