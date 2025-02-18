import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiodeLipolaserComponent } from './diode-lipolaser.component';

describe('DiodeLipolaserComponent', () => {
  let component: DiodeLipolaserComponent;
  let fixture: ComponentFixture<DiodeLipolaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiodeLipolaserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiodeLipolaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
