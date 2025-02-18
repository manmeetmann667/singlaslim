import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonFacialComponent } from './carbon-facial.component';

describe('CarbonFacialComponent', () => {
  let component: CarbonFacialComponent;
  let fixture: ComponentFixture<CarbonFacialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbonFacialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarbonFacialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
