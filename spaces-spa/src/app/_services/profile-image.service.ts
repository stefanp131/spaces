import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  image = new BehaviorSubject<string>('../../../assets/empty-profile-pic.png');

  set(data: string) {
    this.image.next(data);
  }

  get(): Observable<string> {
    return this.image.asObservable();
  }
}
