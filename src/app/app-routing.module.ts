import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/auth-components/login/login.component';
import { SignupComponent } from './auth/auth-components/signup/signup.component';
import { NoAuthGuard } from './auth/auth-guards/noAuth/no-auth.guard';
import { TrackOrderComponent } from './auth/auth-components/track-order/track-order.component';
import { AboutComponent } from './auth/auth-components/about/about.component';
import { HomeComponent } from './auth/auth-components/home/home.component';
import { ContactComponent } from './auth/auth-components/contact/contact.component';

const routes: Routes = [
  { path: 'register', component: SignupComponent, canActivate: [NoAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [NoAuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [NoAuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [NoAuthGuard] },
  { path: 'order', component: TrackOrderComponent, canActivate: [NoAuthGuard] },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'customer', loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
