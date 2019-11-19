import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorCourseCardComponent } from './mentor-course-card.component';

describe('MentorCourseCardComponent', () => {
  let component: MentorCourseCardComponent;
  let fixture: ComponentFixture<MentorCourseCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorCourseCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorCourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
