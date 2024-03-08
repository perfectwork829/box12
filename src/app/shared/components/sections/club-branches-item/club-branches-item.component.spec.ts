import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubBranchesItemComponent } from './club-branches-item.component';

describe('ClubBranchesItemComponent', () => {
  let component: ClubBranchesItemComponent;
  let fixture: ComponentFixture<ClubBranchesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubBranchesItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubBranchesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
