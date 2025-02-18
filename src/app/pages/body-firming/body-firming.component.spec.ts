import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyFirmingComponent } from './body-firming.component';

describe('BodyFirmingComponent', () => {
  let component: BodyFirmingComponent;
  let fixture: ComponentFixture<BodyFirmingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyFirmingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyFirmingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
