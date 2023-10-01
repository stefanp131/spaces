import { Component, OnInit } from '@angular/core';
import { AppState } from '../app-state';
import { Store } from '@ngrx/store';
import { User } from '../_models/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-our-space',
  templateUrl: './our-space.component.html',
  styleUrls: ['./our-space.component.scss'],
})
export class OurSpaceComponent implements OnInit {
  user$: Observable<User>;
  users$: Observable<User[]>;

  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
  }
}
