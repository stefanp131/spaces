import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../_models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  selectedFile: any = null;
  isReadonlyMode = false;
  imageSrc: string;
  aboutMe: string;
  account$: Observable<User>;

  constructor(

  ) {}

  ngOnInit(): void {
    
  }
}
