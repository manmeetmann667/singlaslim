import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaggyskinTreatmentComponent } from './saggyskin-treatment.component';

describe('SaggyskinTreatmentComponent', () => {
  let component: SaggyskinTreatmentComponent;
  let fixture: ComponentFixture<SaggyskinTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaggyskinTreatmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaggyskinTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
