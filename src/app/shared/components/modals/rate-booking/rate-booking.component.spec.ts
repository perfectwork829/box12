import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateBookingComponent } from './rate-booking.component';

describe('RateBookingComponent', () => {
  let component: RateBookingComponent;
  let fixture: ComponentFixture<RateBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
