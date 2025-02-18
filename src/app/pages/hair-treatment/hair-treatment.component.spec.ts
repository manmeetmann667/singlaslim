import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HairTreatmentComponent } from './hair-treatment.component';

describe('HairTreatmentComponent', () => {
  let component: HairTreatmentComponent;
  let fixture: ComponentFixture<HairTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HairTreatmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HairTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
