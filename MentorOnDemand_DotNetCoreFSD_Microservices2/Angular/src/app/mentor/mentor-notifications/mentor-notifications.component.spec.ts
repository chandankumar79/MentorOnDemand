import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorNotificationsComponent } from './mentor-notifications.component';

describe('MentorNotificationsComponent', () => {
  let component: MentorNotificationsComponent;
  let fixture: ComponentFixture<MentorNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
