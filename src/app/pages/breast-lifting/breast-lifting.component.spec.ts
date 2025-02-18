import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreastLiftingComponent } from './breast-lifting.component';

describe('BreastLiftingComponent', () => {
  let component: BreastLiftingComponent;
  let fixture: ComponentFixture<BreastLiftingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreastLiftingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreastLiftingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
