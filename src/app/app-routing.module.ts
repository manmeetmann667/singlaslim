import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { AboutCompanyComponent } from "./about-company/about-company.component"
import { HydraFacialComponent } from "./hydra-facial/hydra-facial.component"
import { LoginComponent } from "./login/login.component"
import { OurMembersComponent } from "./our-members/our-members.component"
import { AboutUsComponent } from "./pages/about-us/about-us.component"

import { BodyFirmingComponent } from "./pages/body-firming/body-firming.component"
import { BreastLiftingComponent } from "./pages/breast-lifting/breast-lifting.component"
import { BurningMarkComponent } from "./pages/burning-mark/burning-mark.component"
import { CarbonFacialComponent } from "./pages/carbon-facial/carbon-facial.component"
import { CryolipolysisComponent } from "./pages/cryolipolysis/cryolipolysis.component"
import { DiodeLipolaserComponent } from "./pages/diode-lipolaser/diode-lipolaser.component"
import { HairRegrowthComponent } from "./pages/hair-regrowth/hair-regrowth.component"
import { HairTreatmentComponent } from "./pages/hair-treatment/hair-treatment.component"
import { HomeComponent } from "./pages/home/home.component"
import { MagicTechComponent } from "./pages/magic-tech/magic-tech.component"
import { OilySkinComponent } from "./pages/oily-skin/oily-skin.component"
import { PhotoFacialComponent } from "./pages/photo-facial/photo-facial.component"
import { SaggyskinTreatmentComponent } from "./pages/saggyskin-treatment/saggyskin-treatment.component"
import { SkinGlowingComponent } from "./pages/skin-glowing/skin-glowing.component"
import { SkinLiftingComponent } from "./pages/skin-lifting/skin-lifting.component"
import { SkinRejuvenationComponent } from "./pages/skin-rejuvenation/skin-rejuvenation.component"
import { SkinTighteningComponent } from "./pages/skin-tightening/skin-tightening.component"
import { StitchesmarkRemovalComponent } from "./pages/stitchesmark-removal/stitchesmark-removal.component"
import { UserProfileComponent } from "./pages/user-profile/user-profile.component"
import { VaginalTightingComponent } from "./pages/vaginal-tighting/vaginal-tighting.component"
import { PhotoGalleryComponent } from "./photo-gallery/photo-gallery.component"
import { RegisterComponent } from "./register/register.component"
import { TestimonialsComponent } from "./testimonials/testimonials.component"
import { MedicalTestimonialComponent } from "./medical-testimonial/medical-testimonial.component"
import { BookAppointmentComponent } from "./pages/book-appointment/book-appointment.component"
import { BlogsComponent } from "./pages/blogs/blogs.component"

const routes: Routes = [
	{ path: "home", component: HomeComponent },
	// { path: 'about-us', component: AboutUsComponent },
	{ path: "user-profile", component: UserProfileComponent },
	{ path: "our-members", component: OurMembersComponent },
	{ path: "photo-gallery", component: PhotoGalleryComponent },
	{ path: "testimonials", component: MedicalTestimonialComponent },
	{ path: "hydra-facial", component: HydraFacialComponent },
	{ path: "our-company", component: AboutCompanyComponent },
	{ path: "login", component: LoginComponent },
	{ path: "register", component: RegisterComponent },
	{ path: "register/:phone", component: RegisterComponent },
	{ path: "photo-facial", component: PhotoFacialComponent },
	{ path: "carbon-facial", component: CarbonFacialComponent },
	{ path: "burning-mark", component: BurningMarkComponent },
	{ path: "vaginal-tighting", component: VaginalTightingComponent },
	{ path: "hair-treatment", component: HairTreatmentComponent },
	{ path: "hair-regrowth", component: HairRegrowthComponent },
	{ path: "oily-skin", component: OilySkinComponent },
	{ path: "skin-lifting", component: SkinLiftingComponent },
	{ path: "cryolipolysis", component: CryolipolysisComponent },
	{ path: "magic-tech", component: MagicTechComponent },
	{ path: "diode-lipolaser", component: DiodeLipolaserComponent },
	{ path: "body-firming", component: BodyFirmingComponent },
	{ path: "casestudies", component: BlogsComponent },
	{
		path: "stitchesmark-removal",
		component: StitchesmarkRemovalComponent,
	},
	{ path: "breast-lifting", component: BreastLiftingComponent },
	{ path: "skin-glowing", component: SkinGlowingComponent },
	{ path: "skin-rejuvenation", component: SkinRejuvenationComponent },
	{
		path: "saggyskin-treatment",
		component: SaggyskinTreatmentComponent,
	},
	{ path: "skin-tightening", component: SkinTighteningComponent },
	{ path: "about-us", component: AboutUsComponent },
	{ path: "book-appointment", component: BookAppointmentComponent },

	{ path: "", component: HomeComponent },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
