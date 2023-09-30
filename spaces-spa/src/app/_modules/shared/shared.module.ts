import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMaterialModule } from '../ng-material/ng-material.module';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { CommentComponent } from './comments/comment/comment.component';
import { CommentsListComponent } from './comments/comments-list/comments-list.component';
import { CreateCommentComponent } from './comments/create-comment/create-comment.component';
import { CreateUpdatePostComponent } from './posts/create-update-post/create-update-post.component';
import { PostComponent } from './posts/post/post.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { UpdatePostComponent } from './posts/update-post/update-post.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
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
    CommonModule,
    NgMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEditorModule,
    RouterModule
  ],
  exports: [
    PostsListComponent,
    PostComponent,
    CreateUpdatePostComponent,
    UpdatePostComponent,
    ProfileComponent,
    CommentComponent,
    CreateCommentComponent,
    CommentsListComponent,
  ],
})
export class SharedModule {}
