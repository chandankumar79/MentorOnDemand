import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { AddCourseComponent } from '../student/add-course/add-course.component';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  courses: any;
  snackbarMessage = 'You must be logged in as a student to apply for courses.';

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.dataService.studentGetTechnologies().subscribe(
      res => {
        // console.log(res);
        this.courses = res['courses'];
      },
      err => {
        console.log(err);
      }
    );
  }

  // open dialog
  selectMentor(course) {
    const dialogRef = this.dialog.open(AddCourseComponent, {
      width: '100%',
      data: { course }
    });

    dialogRef.afterClosed().subscribe(res => {
      // console.log('res-dialog ' + JSON.stringify(res));
      if(res != null) {
        if(res.status == 403) {
          this.displaySnackbar('Forbidden: You must be logged in as a student to apply for courses.', 'red');
        }  
        else if (res.message != null) {
          this.displaySnackbar(res.error.message);
        }
      }
    });
  }

  displaySnackbar(message, color = 'black') {
    const config = new MatSnackBarConfig() ;
    config.duration = 10000;
    config.panelClass = [`snackbar-${color}`];
    this.snackbar.open(message, '', config);
  }

}
