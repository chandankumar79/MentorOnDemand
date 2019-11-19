import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tech-add',
  templateUrl: './tech-add.component.html',
  styleUrls: ['./tech-add.component.scss']
})
export class TechAddComponent implements OnInit {
  addTechForm: FormGroup;
  submitted: boolean;
  editable = this.dataService.addTechEditable;
  selectedCourse: any;

  courses: any;
  coursesCount: number;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
    this.initFormFields();
    if (this.editable) {
      this.selectedCourse = this.dataService.addTechSelectedCourse;
      this.setFormFields(this.selectedCourse);
    } else {
      this.dataService.getCourses();
      this.dataService.courses.subscribe(courses => this.courses = courses);
      this.dataService.coursesCount.subscribe(courseCount => {
        this.coursesCount = courseCount;
        this.addTechForm.controls['courseId'].setValue(`Course${this.coursesCount < 10 ?
          '00' : (this.coursesCount < 100 ? '0' : '')}${this.coursesCount + 1}`);
      });
    }
   }

  ngOnInit() {
    this.submitted = false;
  }

  initFormFields() {
    this.addTechForm = this.formBuilder.group({
      courseId: [],
      courseName: ['', Validators.required],
      courseDescription: ['', Validators.required],
      courseImageSource: ['', Validators.required], // TODO: implement url validator for image links only
      courseFee: ['', Validators.required],
      courseCommission: ['', [Validators.required, Validators.min(0), Validators.max(50)]],
    });
  }

  setFormFields(selectedCourse) {
    this.addTechForm.controls['courseId'].setValue(selectedCourse.courseId);
    this.addTechForm.controls['courseName'].setValue(selectedCourse.courseName);
    this.addTechForm.controls['courseDescription'].setValue(selectedCourse.courseDescription);
    this.addTechForm.controls['courseImageSource'].setValue(selectedCourse.courseImageSource);
    this.addTechForm.controls['courseFee'].setValue(selectedCourse.courseFee);
    this.addTechForm.controls['courseCommission'].setValue(selectedCourse.courseCommission);
  }

  get techFormControls() { return this.addTechForm.controls; }

  onTechUpdate() {
    console.log('update request');
    let course = this.addTechForm.value;
    course._id = this.selectedCourse._id;
    this.dataService.adminUpdateCourse(course).subscribe(
      res => {
        console.log(res);
        this.dataService.addTechEditableCourse(null);
        this.dataService.addTechEditableStatus(false);
        this.router.navigateByUrl('admin/admin-courses');
      },
      err => {
        console.log(err);
      }
    )
  }

  onCancel() {
    this.router.navigateByUrl('admin/admin-courses');
  }

  onSubmit() {
    // ? unable to set data on init form here and hence reading data here after html is loaded
    this.addTechForm.controls['courseId']
      .setValue(`Course${this.coursesCount < 10 ? '00' : (this.coursesCount < 100 ? '0' : '')}${this.coursesCount + 1}`);

    this.submitted = true;

    console.log(this.addTechForm.value);
    if (this.addTechForm.invalid) { return; }

    this.dataService.addTech(this.addTechForm.value)
      .subscribe(
        res => {
          console.log('Course Added successfully!');

          // * update courses list after successful adding of a new technology
          this.dataService.getCourses();

          // TODO: note: on successfully submitting the form need to clear the fields but not show red outline kind of error case
          // * reset data field items
          this.addTechForm.reset();
          this.submitted = false;
        },
        err => {
          console.log(err);
        }
      );
  }

}
