import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'my-space',
    loadChildren: () => import('./my-space/my-space/my-space.module').then(m => m.MySpaceModule),
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
  {
    path: 'our-space',
    loadChildren: () => import('./our-space/our-space/our-space.module').then(m => m.OurSpaceModule),
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
  {
    path: '*',
    component: HomeComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
