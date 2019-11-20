import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DataService } from 'src/app/shared/data.service';

export class Student {
  // tslint:disable-next-line: variable-name
  _id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentCoursesActive: number;
  studentCoursesCompleted: number;
  studentPaymentTotal: string;
  studentStatus: string;
}

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  tableTitle = 'Students List';
  tableData: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  tableDataItems = {
    tableDisplayHeader: [],
    tableHeader: ['name', 'email', 'activeCourses', 'completedCourses', 'totalCourses', 'status', 'action'],
    tableRow: [ ]
  };

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getStudentData();    
    // TODO: implement sorting and paginator
  }

  getStudentData() {
    this.tableDataItems.tableRow = [];
    this.dataService.adminGetStudents().subscribe(
      res => {
        const students = res['students'];
        this.tableData = new MatTableDataSource(students);
        this.tableData.sort = this.sort;    
      },
      err => {
        console.log('AdminUsers | error: ' + JSON.stringify(err));
      }
    )
  }

  // onInfo(student) {
  //   this.dataService.adminGetStudentProfile(student).subscribe(
  //     res => {
  //       console.log('onInfo: ' + JSON.stringify(res));
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   )
  // }

  onBlock(student) {
    student.status = !student.status;
    console.log(student);
    this.dataService.adminUpdateUser(student).subscribe(
      res => {
        console.log(res);
        this.getStudentData();
      },
      err => {
        console.log(err);
      }
    )
  }
}
