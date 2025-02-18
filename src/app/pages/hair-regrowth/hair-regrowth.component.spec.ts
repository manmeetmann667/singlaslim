import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HairRegrowthComponent } from './hair-regrowth.component';

describe('HairRegrowthComponent', () => {
  let component: HairRegrowthComponent;
  let fixture: ComponentFixture<HairRegrowthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HairRegrowthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HairRegrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
