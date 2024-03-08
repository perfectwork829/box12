import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendSubscriptionComponent } from './suspend-subscription.component';

describe('SuspendSubscriptionComponent', () => {
  let component: SuspendSubscriptionComponent;
  let fixture: ComponentFixture<SuspendSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspendSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspendSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
