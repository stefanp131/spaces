import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MySpaceComponent } from './my-space/my-space.component';
import { OurSpaceComponent } from './our-space/our-space.component';
import { NgMaterialModule } from './_modules/ng-material/ng-material.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MySpaceComponent,
    OurSpaceComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
