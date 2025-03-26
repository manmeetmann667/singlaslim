import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSilderComponent } from './video-silder.component';

describe('VideoSilderComponent', () => {
  let component: VideoSilderComponent;
  let fixture: ComponentFixture<VideoSilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoSilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoSilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
