import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ourSpaceReducer } from '../our-space-state/our-space.reducers';
import { OurSpaceEffects } from '../our-space-state/our-space.effects';
import { StoreModule } from '@ngrx/store';
import { OurSpaceComponent } from '../our-space.component';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from 'src/app/_modules/shared/shared.module';
import { MainComponent } from 'src/app/_modules/shared/posts/main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/_guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
];
@NgModule({
  declarations: [OurSpaceComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('ourSpace', ourSpaceReducer),
    EffectsModule.forFeature([OurSpaceEffects]),
    RouterModule.forChild(routes),
  ],
  exports: [OurSpaceComponent],
})
export class OurSpaceModule {}
