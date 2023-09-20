import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OurSpaceComponent } from './our-space/our-space.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { MySpaceComponent } from './my-space/my-space.component';
import { AuthGuard } from './_guards/auth.guard';
import { UpdatePostComponent } from './posts/update-post/update-post.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: OurSpaceComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'my-space',
    component: MySpaceComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
  {
    path: 'my-space/:id',
    component: UpdatePostComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { path: '*', component: OurSpaceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
