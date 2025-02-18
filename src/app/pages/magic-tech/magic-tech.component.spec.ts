import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicTechComponent } from './magic-tech.component';

describe('MagicTechComponent', () => {
  let component: MagicTechComponent;
  let fixture: ComponentFixture<MagicTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagicTechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagicTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
