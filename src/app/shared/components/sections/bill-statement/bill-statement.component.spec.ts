import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillStatementComponent } from './bill-statement.component';

describe('BillStatementComponent', () => {
  let component: BillStatementComponent;
  let fixture: ComponentFixture<BillStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillStatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
