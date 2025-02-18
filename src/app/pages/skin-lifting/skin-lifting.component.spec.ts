import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinLiftingComponent } from './skin-lifting.component';

describe('SkinLiftingComponent', () => {
  let component: SkinLiftingComponent;
  let fixture: ComponentFixture<SkinLiftingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkinLiftingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkinLiftingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
