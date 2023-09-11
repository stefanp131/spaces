import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MySpaceComponent } from './my-space/my-space.component';
import { OurSpaceComponent } from './our-space/our-space.component';
import { NgMaterialModule } from './_modules/ng-material/ng-material.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { accountReducer } from './_ngrx/account/reducers';
import { LoaderComponent } from './loader/loader/loader.component';
import { AccountEffects } from './_ngrx/account/effects';

@NgModule({
  declarations: [
    AppComponent,
    MySpaceComponent,
    OurSpaceComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ spaces: accountReducer }),
    EffectsModule.forRoot([AccountEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
