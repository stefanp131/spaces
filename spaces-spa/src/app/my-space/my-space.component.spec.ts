import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySpaceComponent } from './my-space.component';

describe('MySpaceComponent', () => {
  let component: MySpaceComponent;
  let fixture: ComponentFixture<MySpaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MySpaceComponent]
    });
    fixture = TestBed.createComponent(MySpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
