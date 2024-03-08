import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeTrialComponent } from './free-trial.component';

describe('FreeTrialComponent', () => {
  let component: FreeTrialComponent;
  let fixture: ComponentFixture<FreeTrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeTrialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
