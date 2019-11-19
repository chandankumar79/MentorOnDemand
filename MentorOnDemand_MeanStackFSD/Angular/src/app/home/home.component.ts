import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { AddCourseComponent } from '../student/add-course/add-course.component';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  courses: any;

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private snackbar: MatSnackBar
  ) {
    this.dataService.courses.subscribe(courses => this.courses = courses);
  }

  ngOnInit() {
    this.dataService.getCourses();
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
      const config = new MatSnackBarConfig();
      config.duration = 5000;
      this.snackbar.open(result, '', config);
    });
  }
}
