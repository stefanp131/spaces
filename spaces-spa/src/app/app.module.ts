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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { accountReducer } from './account/account-state/account.reducers';
import { LoaderComponent } from './loader/loader/loader.component';
import { AccountEffects } from './account/account-state/account.effects';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostComponent } from './posts/post/post.component';
import { CreateUpdatePostComponent } from './posts/create-update-post/create-update-post.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { mySpaceReducer } from './my-space/my-space-state/my-space.reducers';
import { MySpaceEffects } from './my-space/my-space-state/my-space.effects';
import { UpdatePostComponent } from './posts/update-post/update-post.component';
import { NgxEditorModule } from 'ngx-editor';
import { ProfileComponent } from './profile/profile.component';
import { CommentComponent } from './comments/comment/comment.component';
import { CreateCommentComponent } from './comments/create-comment/create-comment.component';
import { CommentsListComponent } from './comments/comments-list/comments-list.component';
import { ourSpaceReducer } from './our-space/our-space-state/our-space.reducers';
import { OurSpaceEffects } from './our-space/our-space-state/our-space.effects';


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
    PostsListComponent,
    PostComponent,
    CreateUpdatePostComponent,
    UpdatePostComponent,
    ProfileComponent,
    CommentComponent,
    CreateCommentComponent,
    CommentsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ account: accountReducer, mySpace: mySpaceReducer, ourSpace: ourSpaceReducer }),
    EffectsModule.forRoot([AccountEffects, MySpaceEffects, OurSpaceEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    NgxEditorModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
