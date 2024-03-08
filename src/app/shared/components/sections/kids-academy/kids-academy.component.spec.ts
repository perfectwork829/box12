import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KidsAcademyComponent } from './kids-academy.component';

describe('KidsAcademyComponent', () => {
  let component: KidsAcademyComponent;
  let fixture: ComponentFixture<KidsAcademyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KidsAcademyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KidsAcademyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
