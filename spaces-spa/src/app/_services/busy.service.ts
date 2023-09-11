import { Injectable } from '@angular/core';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;

  constructor(private loader: LoaderService) { }

  busy() {
    this.busyRequestCount++;
    this.loader.setLoading(true);
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.loader.setLoading(false);
    }
  }
}