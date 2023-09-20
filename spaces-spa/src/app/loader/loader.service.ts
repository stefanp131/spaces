import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading = new BehaviorSubject<boolean>(true);

  constructor() { }

  setLoading(data: boolean) {
    this.loading.next(data);
  }

  getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }
}