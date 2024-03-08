import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubBranchesComponent } from './club-branches.component';

describe('ClubBranchesComponent', () => {
  let component: ClubBranchesComponent;
  let fixture: ComponentFixture<ClubBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubBranchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
