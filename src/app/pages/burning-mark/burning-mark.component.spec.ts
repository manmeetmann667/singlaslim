import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurningMarkComponent } from './burning-mark.component';

describe('BurningMarkComponent', () => {
  let component: BurningMarkComponent;
  let fixture: ComponentFixture<BurningMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BurningMarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BurningMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
