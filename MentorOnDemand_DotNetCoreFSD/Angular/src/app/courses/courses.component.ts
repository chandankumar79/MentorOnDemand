import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { AddCourseComponent } from '../student/add-course/add-course.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  searchForm: FormGroup;
  courses: any;
  inputSearchCourses: string;

  constructor(
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {
    // this.dataService.courses.subscribe(courses => this.courses = courses);
  }

  ngOnInit() {
    // this.initFormFields();
    this.dataService.getCourses2();

  }

  initFormFields() {
    this.searchForm = this.formBuilder.group({
      inputSearchCourses: '',
      inputSearchMentors: '',
      inputSearchDateFrom: '',
      inputSearchDateTo: ''
    });
  }

  searchSubmit() {
    // console.log(this.searchForm.value);
    // console.log(this.courses);
    // this.dataService.searchCourses(this.searchForm.value).subscribe(
    //   res => {
    //     console.log(res);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
    // TODO: currently using filter pipe to search for courses
  }

  // open dialog
  selectMentor(course) {
    console.log(course);
    const dialogRef = this.dialog.open(AddCourseComponent, {
      width: '100%',
      data: { course }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed.');
      console.log(result);
      const config = new MatSnackBarConfig();
      config.duration = 5000;
      this.snackbar.open(result.message, '', config);
    });
  }


}
