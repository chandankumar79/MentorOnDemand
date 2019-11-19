import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';

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
    tableHeader: ['courseName', 'mentorName', 'courseDuration', 'courseTotalFee',
      'courseStartDate', 'courseEndDate', 'courseStatus', 'courseProgress', 'studentAction'],
    tableRow: []
  };

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    // TODO: implement sorting and paginator
    this.getTableData();
  }

  getTableData() {
    this.dataService.studentGetMyCourses().subscribe(
      res => {
        // tslint:disable-next-line: no-string-literal
        const studentCourses = res['studentCourses'];
        this.tableData = new MatTableDataSource(studentCourses);
        this.tableData.sort = this.sort;
      },
      err => {
        console.log(err);
      }
    );
  }

  onRate(course) {
    // TODO: open dialog to rate course by mentor
  }

  onPay(course) {
    // TODO: update paymentStatus > true, courseStatus > active, paymentId > string(...)
  }

  setStatus() {
    // TODO: update courseStatus based on value from dialog
  }

}
