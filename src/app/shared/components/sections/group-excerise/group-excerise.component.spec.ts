import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupExceriseComponent } from './group-excerise.component';

describe('GroupExceriseComponent', () => {
  let component: GroupExceriseComponent;
  let fixture: ComponentFixture<GroupExceriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupExceriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupExceriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
