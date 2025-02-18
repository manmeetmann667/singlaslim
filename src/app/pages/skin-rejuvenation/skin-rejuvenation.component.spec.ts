import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinRejuvenationComponent } from './skin-rejuvenation.component';

describe('SkinRejuvenationComponent', () => {
  let component: SkinRejuvenationComponent;
  let fixture: ComponentFixture<SkinRejuvenationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkinRejuvenationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkinRejuvenationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
