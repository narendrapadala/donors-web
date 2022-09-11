import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { CreateDonorComponent } from './create-donor/create-donor.component';
import { DonorsListComponent } from './donors-list/donors-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'donate',
    component: CreateDonorComponent,
    canActivate: [AuthGuardGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'list-donors',
    component: DonorsListComponent,
    canActivate: [AuthGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
