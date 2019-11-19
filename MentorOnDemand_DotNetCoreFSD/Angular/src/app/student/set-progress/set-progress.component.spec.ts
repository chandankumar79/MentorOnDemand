import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetProgressComponent } from './set-progress.component';

describe('SetProgressComponent', () => {
  let component: SetProgressComponent;
  let fixture: ComponentFixture<SetProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
