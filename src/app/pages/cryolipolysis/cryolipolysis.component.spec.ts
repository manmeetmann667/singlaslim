import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryolipolysisComponent } from './cryolipolysis.component';

describe('CryolipolysisComponent', () => {
  let component: CryolipolysisComponent;
  let fixture: ComponentFixture<CryolipolysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryolipolysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryolipolysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
