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
  courses: any = null;
  inputSearchCourses: string;

  constructor(
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private dataService: DataService
  ) { }

  ngOnInit() { }

  searchSubmit() {
    console.log(this.inputSearchCourses);
    this.dataService.searchCourses(this.inputSearchCourses).subscribe(res => {
      console.log(res);
      this.courses = res['courses'];
    }, err => {
      console.log(err);
    });
  }

  // open dialog
  selectMentor(course) {
    const dialogRef = this.dialog.open(AddCourseComponent, {
      width: '100%',
      data: { course }
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log('dialog')
      if (res != null) {
        this.displaySnackbar(res.message);
      } else if( res == null) {
        this.displaySnackbar('You must be logged in to apply for courses', 'red');
      }
      else if(res == 'blank') { }
    }, err => {
      console.log('dialog close err' + JSON.stringify(err));
    });
  }

  displaySnackbar(message, color = 'black') {
    const config = new MatSnackBarConfig() ;
    config.duration = 10000;
    config.panelClass = [`snackbar-${color}`];
    this.snackbar.open(message, '', config);
  }

}
