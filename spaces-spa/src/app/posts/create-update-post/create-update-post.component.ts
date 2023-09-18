import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-update-post',
  templateUrl: './create-update-post.component.html',
  styleUrls: ['./create-update-post.component.scss'],
})
export class CreateUpdatePostComponent implements OnInit {
  createUpdatePostForm: FormGroup;

  /**
   *
   */
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.createUpdatePostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  createUpdate() {
    
  }
}
