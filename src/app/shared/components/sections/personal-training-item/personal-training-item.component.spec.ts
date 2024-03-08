import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTrainingItemComponent } from './personal-training-item.component';

describe('PersonalTrainingItemComponent', () => {
  let component: PersonalTrainingItemComponent;
  let fixture: ComponentFixture<PersonalTrainingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalTrainingItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalTrainingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
