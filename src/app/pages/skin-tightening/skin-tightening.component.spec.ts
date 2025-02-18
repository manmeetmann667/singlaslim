import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinTighteningComponent } from './skin-tightening.component';

describe('SkinTighteningComponent', () => {
  let component: SkinTighteningComponent;
  let fixture: ComponentFixture<SkinTighteningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkinTighteningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkinTighteningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
