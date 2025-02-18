import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HydraFacialComponent } from './hydra-facial.component';

describe('HydraFacialComponent', () => {
  let component: HydraFacialComponent;
  let fixture: ComponentFixture<HydraFacialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HydraFacialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HydraFacialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
