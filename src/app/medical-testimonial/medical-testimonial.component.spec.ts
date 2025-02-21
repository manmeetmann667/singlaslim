import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTestimonialComponent } from './medical-testimonial.component';

describe('MedicalTestimonialComponent', () => {
  let component: MedicalTestimonialComponent;
  let fixture: ComponentFixture<MedicalTestimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalTestimonialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
