import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss']
})
export class AddSkillComponent implements OnInit {
  // * data items for edit skill case
  // editable: false; // implement an observable here to check if the form is of type edit or new addition
  // selectedCourse: any;

  submitted: boolean;
  courses: any;
  skillForm: FormGroup;
  courseStartDateMin = new Date();
  courseEndDateMin: Date; // ! update not working check later
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    ) {
      // this.dataService.mentorEditSkill.subscribe(data => {
      //   console.log(data);
      //   this.editable = data.editable;
      //   this.selectedCourse = data.course;
      //   console.log('* ' + data.editable);
      //   this.initFormFields();
      //   this.setSkillFormEdit(data.course);
      // });
      this.dataService.getCourses();
      this.dataService.courses.subscribe(courses => this.courses = courses);
  }

  // * NOTE NEED TO IMPLEMENT EDIT SKILL EVENT BASED ON DATA PASSED;
  // * implement every all calling based on data received from backend

  ngOnInit() {
    this.submitted = false;
    // console.log('** ' + this.editable);
    this.initFormFields();
    // if (this.editable) { this.setSkillForm(this.selectedCourse); } // in case of edit
  }

  initFormFields() {
    // console.log('*** ' + this.editable);
    this.skillForm = this.formBuilder.group({
      courseName: ['', Validators.required],
      courseId: [''],
      courseExperience: ['', Validators.required],
      courseMentorSurcharge: ['', Validators.required],
      courseFee: [''],
      courseCommission: [''],
      courseTotalFee: [''],
      courseDuration: [''],
      courseStartDate: ['', Validators.required],
      courseEndDate: ['', Validators.required]
    });
  }

  get skillFormControls() { return this.skillForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop her if the form is invalid
    if (this.skillForm.invalid) { return; }
    console.log('received');

    // TODO: *** implement course duration match for start and end date of a course
    this.dataService.mentorAddSkill(this.skillForm.value).subscribe(
      res => {
        console.log(res);
        this.message = res['message'];
      },
      err => {
        this.message = err.error['message'];
      }
    );
  }

  onCancel() {
    this.skillForm.reset();
    this.router.navigateByUrl('mentor/mentor-courses');
  }

  setSkillForm(selectedCourse) {
    // console.log(selectedCourse);
    this.skillForm.controls.courseId.setValue(selectedCourse.courseId);
    this.skillForm.controls.courseFee.setValue(selectedCourse.courseFee);
    this.skillForm.controls.courseCommission.setValue(selectedCourse.courseCommission);
    this.skillForm.controls.courseDuration.setValue(40); // TODO: also implement in admin add tech
    this.calculateTotalFee();
    this.courseStartDateMin = new Date();
    this.calculateCourseEndDate();
  }

  // setSkillFormEdit(selectedCourse) {
  //   console.log('**** ' + this.editable);
  //   this.skillForm.controls.courseId.setValue(selectedCourse.courseId);
  //   this.skillForm.controls.courseFee.setValue(selectedCourse.courseFee);
  //   this.skillForm.controls.courseCommission.setValue(selectedCourse.courseCommission);
  //   this.skillForm.controls.courseDuration.setValue(selectedCourse.courseDuration); // TODO: also implement in admin add tech
  //   this.calculateTotalFee();
  //   this.skillForm.controls.courseStartDate.setValue(selectedCourse.courseStartDate);
  //   this.skillForm.controls.courseEndDate.setValue(selectedCourse.courseEndDate);
  //   this.courseStartDateMin = new Date();
  // }

  calculateTotalFee() {
    const totalFee = (this.skillForm.controls.courseFee.value as number) * (
      1 + 0.01 * (this.skillForm.controls.courseCommission.value as number)
        + 0.01 * (this.skillForm.controls.courseMentorSurcharge.value as number));
    this.skillForm.controls.courseTotalFee.setValue(totalFee.toFixed()); // round of number
  }

  calculateCourseEndDate() {
    this.courseEndDateMin = new Date(
      this.courseStartDateMin.getFullYear(),
      this.courseStartDateMin.getMonth(),
      this.courseStartDateMin.getDay() + (this.skillForm.value.courseDuration as number)
    );
  }
}
