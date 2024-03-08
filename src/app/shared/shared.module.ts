import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from 'src/app/shared/components/slider/slider.component';
import { RouterLink } from '@angular/router';
import { MenuSliderComponent } from './components/menu-slider/menu-slider.component';
import { PartnersComponent } from './components/sections/partners/partners.component';
import { SubscribersComponent } from './components/sections/subscribers/subscribers.component';
import { WorkoutsComponent } from './components/sections/workouts/workouts.component';

import { TrainersComponent } from './components/sections/trainers/trainers.component';
import { ContactFormComponent } from './components/modals/contact-form/contact-form.component';
import { AboutUsComponent } from './components/sections/about-us/about-us.component';
import { TranslateModule } from '@ngx-translate/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { PackagesComponent } from './components/sections/packages/packages.component';
import { MembershipsComponent } from './components/sections/memberships/memberships.component';
import { GroupExceriseComponent } from './components/sections/group-excerise/group-excerise.component';

import { CoreDirectivesModule } from "./directives/directives";
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import {FormsModule} from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';
import {NgbInputDatepicker, NgbTimepicker} from "@ng-bootstrap/ng-bootstrap";
import { PageSliderComponent } from './components/page-slider/page-slider.component';
import { FreeTrialComponent } from './components/modals/free-trial/free-trial.component';
import { LanguageComponent } from './components/modals/language/language.component';
import { ProfileComponent } from './components/modals/profile/profile.component';
import { ProgramsComponent } from './components/sections/programs/programs.component';
import { CheckOutComponent } from './components/modals/check-out/check-out.component';
import { ProductItemComponent } from './components/sections/product-item/product-item.component';
import { SpinnerComponent } from './components/spinner/spinner/spinner.component';
import { PersonalTrainingItemComponent } from './components/sections/personal-training-item/personal-training-item.component';
import { KidsAcademyComponent } from './components/sections/kids-academy/kids-academy.component';
import { SubscriptionsComponent } from './components/sections/subscriptions/subscriptions.component';
import { ProfileDetailComponent } from './components/sections/profile-detail/profile-detail.component';
import { ProfileInfoComponent } from './components/sections/profile-info/profile-info.component';
import { ClubBranchesComponent } from './components/sections/club-branches/club-branches.component';
import { ClubBranchesItemComponent } from './components/sections/club-branches-item/club-branches-item.component';
import { ReferralCodeComponent } from './components/modals/referral-code/referral-code.component';
import { ConfirmDialogComponent } from './components/modals/confirm-dialog/confirm-dialog.component';
import { BranchSettingComponent } from './components/modals/branch-setting/branch-setting.component';
import { PipesModule } from "./pipes/pipes";
import { BookingItemsComponent } from './components/sections/booking-items/booking-items.component';
import { SuspendSubscriptionComponent } from './components/modals/suspend-subscription/suspend-subscription.component';
import { RateBookingComponent } from './components/modals/rate-booking/rate-booking.component';
import { CancelBookingComponent } from './components/modals/cancel-booking/cancel-booking.component';
import { BillStatementComponent } from './components/sections/bill-statement/bill-statement.component';
import { NotificationsComponent } from './components/modals/notifications/notifications.component';
import { ConfirmCodeComponent } from './components/modals/confirm-code/confirm-code.component';
import { ForgetPasswordComponent } from './components/auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { TermsConditionsComponent } from './components/modals/terms-conditions/terms-conditions.component';

// import {ClipboardModule} from '@angular/cdk/clipboard'
import { ClipboardModule } from 'ngx-clipboard';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [SliderComponent, MenuSliderComponent, PartnersComponent, TrainersComponent, ContactFormComponent, AboutUsComponent, GoogleMapComponent, PackagesComponent, MembershipsComponent, LoginComponent, SignupComponent, PageSliderComponent, FreeTrialComponent, LanguageComponent, ProfileComponent, ProgramsComponent, CheckOutComponent, SpinnerComponent,
    PersonalTrainingItemComponent, KidsAcademyComponent, ProductItemComponent, SubscriptionsComponent,ProfileDetailComponent,
    ProfileInfoComponent, ClubBranchesComponent, ReferralCodeComponent, ClubBranchesItemComponent,
    ConfirmDialogComponent, BookingItemsComponent, SuspendSubscriptionComponent, RateBookingComponent, CancelBookingComponent, 
    BillStatementComponent, NotificationsComponent, BranchSettingComponent, SubscribersComponent, WorkoutsComponent, GroupExceriseComponent, 
    ConfirmCodeComponent, ForgetPasswordComponent, ResetPasswordComponent, TermsConditionsComponent],
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    GoogleMapsModule,
    CoreDirectivesModule,
    FormsModule,
    NgSelectModule,
    NgbInputDatepicker,
    NgbTimepicker,
    PipesModule,
    ClipboardModule,
    ImageCropperModule
  ],
  exports: [SliderComponent, MenuSliderComponent, ContactFormComponent, TrainersComponent, PartnersComponent, AboutUsComponent, 
    GoogleMapComponent, PackagesComponent, MembershipsComponent, CoreDirectivesModule, PipesModule, LoginComponent, 
    SignupComponent, PageSliderComponent, ProfileComponent, ProgramsComponent, CheckOutComponent, SpinnerComponent, 
    PersonalTrainingItemComponent, KidsAcademyComponent, ProductItemComponent, SubscriptionsComponent, ProfileDetailComponent,    
    ProfileInfoComponent, ClubBranchesComponent, ReferralCodeComponent, ClubBranchesItemComponent, 
    ConfirmDialogComponent, BookingItemsComponent, SuspendSubscriptionComponent,RateBookingComponent, CancelBookingComponent, 
    BillStatementComponent, NotificationsComponent, BranchSettingComponent, SubscribersComponent,WorkoutsComponent, 
    GroupExceriseComponent, ConfirmCodeComponent, ForgetPasswordComponent, ResetPasswordComponent, TermsConditionsComponent]
})
export class SharedModule { }
