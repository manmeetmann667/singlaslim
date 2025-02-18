import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinGlowingComponent } from './skin-glowing.component';

describe('SkinGlowingComponent', () => {
  let component: SkinGlowingComponent;
  let fixture: ComponentFixture<SkinGlowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkinGlowingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkinGlowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
