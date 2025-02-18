import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StitchesmarkRemovalComponent } from './stitchesmark-removal.component';

describe('StitchesmarkRemovalComponent', () => {
  let component: StitchesmarkRemovalComponent;
  let fixture: ComponentFixture<StitchesmarkRemovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StitchesmarkRemovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StitchesmarkRemovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
