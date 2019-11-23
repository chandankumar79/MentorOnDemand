import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import * as uuid from 'uuid';
import { RateMentorComponent } from '../rate-mentor/rate-mentor.component';
import { SetProgressComponent } from '../set-progress/set-progress.component';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.scss']
})
export class StudentCoursesComponent implements OnInit {
  tableTitle = 'My Courses';
  tableData: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  coursesList = {
    tableDisplayHeader: [ ],
    tableHeader: ['courseId', 'name', 'mentorName', 'startDate', 'endDate', 'totalFee',
      'paymentStatus', 'paymentId', 'rating', 'status', 'progress', 'action'],
    tableRow: []
  };

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private dataService: DataService,
    private snackbar: MatSnackBar,
    ) { }

  ngOnInit() {
    // TODO: implement sorting and paginator
    this.getTableData();
  }

  getTableData() {
    this.dataService.studentGetMyCourses().subscribe(
      res => {
        // console.log(res);
        // tslint:disable-next-line: no-string-literal
        const studentCourses = res['courses'];
        this.tableData = new MatTableDataSource(studentCourses);
        this.tableData.sort = this.sort;
      },
      err => {
        console.log(err);
      }
    );
  }

  onRate(course) {
    const dialogRef = this.dialog.open(RateMentorComponent, {
      width: '500px',
      data: { course }
    });
    dialogRef.afterClosed().subscribe(stars => {
      // console.log('dialog closed');
      // console.log(stars);
      if (stars != null) {
        this.dataService.studentRateMentor(course.courseId, stars).subscribe(
          res => {
            this.displaySnackbar(res['message']);
            // console.log(res);
            this.getTableData();
          }, err => {
            // console.log(err);
            this.displaySnackbar(err.error.message);
          }
        );
      }
    });
  }

  onPay(course) {
    const paymentId = uuid.v4();
    this.dataService.studentCoursePayment(course.courseId, paymentId).subscribe(res => {
      // console.log(res);
      this.displaySnackbar(res['message']);
      this.getTableData();
    }, err => {
      // console.log(err);
      this.displaySnackbar(err.error.message);
    });
  }

  onCancel(course) {
    this.dataService.studentCourseCancel(course.courseId).subscribe(res => {
      // console.log(res);
      this.displaySnackbar(res['message']);
      this.getTableData();
    }, err => {
      // console.log(err);
      this.displaySnackbar(err.error.message);
    });
  }

  setProgress(course) {
    const dialogRef = this.dialog.open(SetProgressComponent, {
      // width: '500px',
      data: { course }
    });
    dialogRef.afterClosed().subscribe(progress => {
      // console.log('dialog closed');
      // console.log(progress);
      if (progress != null) {
        this.dataService.studentSetProgress(course.courseId, progress).subscribe(
          res => {
            console.log(res);
            const message = res['message'];
            this.displaySnackbar(message, 'green');
            this.getTableData();
          }, err => {
            // console.log(err.error.message);
            const message = err.error.message;
            this.displaySnackbar(message, 'red');
          }
        );
      }
    });
  }

  displaySnackbar(message, color = 'black') {
    const config = new MatSnackBarConfig() ;
    config.duration = 10000;
    config.panelClass = [`snackbar-${color}`];
    this.snackbar.open(message, '', config);
  }

  getStatusText(code) {
    switch (code) {
      case 1: return 'Proposed';
      case 2: return 'Accepted';
      case 3: return 'Approved';
      case 4: return 'Ongoing';
      case 5: return 'Completed';
      case 6: return 'Cancelled';
      case 7: return 'Rejected';
      case 8: return 'Payment Failed';
      default: return 'Invalid!';
    }
  }


}
