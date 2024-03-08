import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { AuthGuard } from './shared/services/guards/auth.guard';

const routes: Routes = [
  { path: '', component: MainComponent, loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
  // { path: '', component: MainComponent, loadChildren: () => import('./pages/coming-soon/coming-soon.module').then(m => m.ComingSoonModule)},
  // { path: 'academy', component: MainComponent, loadChildren: () => import('./pages/academy/academy.module').then(m => m.AcademyModule)},
  { path: 'policy', component: MainComponent, loadChildren: () => import('./pages/policy/policy.module').then(m => m.PolicyModule)},
  { path: 'products', component: MainComponent, loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule), canActivate: [AuthGuard]},  
  { path: 'trainers', component: MainComponent, loadChildren: () => import('./pages/personal-training/personal-training.module').then(m => m.PersonalTrainingModule), canActivate: [AuthGuard] },  
  { path: 'membership', component: MainComponent, loadChildren: () => import('./pages/membership/membership.module').then(m => m.MembershipModule) , canActivate: [AuthGuard]},  
  { path: 'profile', component: MainComponent, loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard]},  
  { path: 'bookings', component: MainComponent, loadChildren: () => import('./pages/bookings/bookings.module').then(m => m.BookingsModule), canActivate: [AuthGuard]},  
  { path: 'products/buy/:id', component: MainComponent, loadChildren: () =>import('./pages/products/products.module').then((m) => m.ProductsModule), canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
