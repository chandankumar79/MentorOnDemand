import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechAddComponent } from './tech-add.component';

describe('TechAddComponent', () => {
  let component: TechAddComponent;
  let fixture: ComponentFixture<TechAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
