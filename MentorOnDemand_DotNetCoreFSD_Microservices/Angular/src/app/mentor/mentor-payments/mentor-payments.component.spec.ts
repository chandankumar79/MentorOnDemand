import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorPaymentsComponent } from './mentor-payments.component';

describe('MentorPaymentsComponent', () => {
  let component: MentorPaymentsComponent;
  let fixture: ComponentFixture<MentorPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
