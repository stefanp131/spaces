import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurSpaceComponent } from './our-space.component';

describe('OurSpaceComponent', () => {
  let component: OurSpaceComponent;
  let fixture: ComponentFixture<OurSpaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurSpaceComponent]
    });
    fixture = TestBed.createComponent(OurSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
