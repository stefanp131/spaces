import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { mySpaceReducer } from '../my-space-state/my-space.reducers';
import { MySpaceEffects } from '../my-space-state/my-space.effects';
import { MySpaceComponent } from '../my-space.component';
import { SharedModule } from 'src/app/_modules/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { UpdatePostComponent } from 'src/app/_modules/shared/posts/update-post/update-post.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { NgMaterialModule } from 'src/app/_modules/ng-material/ng-material.module';

const routes: Routes = [
  {
    path: '',
    component: MySpaceComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
  {
    path: ':id',
    component: UpdatePostComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
];

@NgModule({
  declarations: [MySpaceComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgMaterialModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('mySpace', mySpaceReducer),
    EffectsModule.forFeature([MySpaceEffects]),
  ],
  exports: [MySpaceComponent, RouterModule],
})
export class MySpaceModule {}
