import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileInfoComponent } from '../../shared/components/sections/profile-info/profile-info.component';
import { ClubBranchesComponent } from '../../shared/components/sections/club-branches/club-branches.component';
import { BillStatementComponent } from '../../shared/components/sections/bill-statement/bill-statement.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },  
  { path: 'personal-data', component: ProfileInfoComponent },  
  { path: 'branches', component: ClubBranchesComponent },
  { path: 'financial-operations', component: BillStatementComponent }    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
