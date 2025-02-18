import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilySkinComponent } from './oily-skin.component';

describe('OilySkinComponent', () => {
  let component: OilySkinComponent;
  let fixture: ComponentFixture<OilySkinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OilySkinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OilySkinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
