import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    standalone: false
})
export class LoaderComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(public loader: LoaderService) { }

  ngOnInit(): void {
    this.loading$ = this.loader.getLoading();
  }

}