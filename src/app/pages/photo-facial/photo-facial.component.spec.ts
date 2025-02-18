import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoFacialComponent } from './photo-facial.component';

describe('PhotoFacialComponent', () => {
  let component: PhotoFacialComponent;
  let fixture: ComponentFixture<PhotoFacialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoFacialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoFacialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
