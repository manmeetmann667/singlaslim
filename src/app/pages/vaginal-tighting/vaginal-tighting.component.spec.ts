import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaginalTightingComponent } from './vaginal-tighting.component';

describe('VaginalTightingComponent', () => {
  let component: VaginalTightingComponent;
  let fixture: ComponentFixture<VaginalTightingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaginalTightingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaginalTightingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
