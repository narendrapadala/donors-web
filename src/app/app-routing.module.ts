import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDonorComponent } from './create-donor/create-donor.component';
import { DonorsListComponent } from './donors-list/donors-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'donate',
    pathMatch: 'full',
  },
  {path:'donate',component:CreateDonorComponent},
  {path:'list-donors',component:DonorsListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
