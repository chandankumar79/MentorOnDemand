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
    tableHeader: ['studentName', 'studentEmail', 'studentCoursesActive', 'studentCoursesCompleted', 
                  'studentPaymentTotal', 'studentStatus', 'studentAction'],
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
        // console.log('res: -----');
        // console.log(res);
        // console.log('res: -----');
        const students = res['students'];
        students.forEach(student => {
          const tempStudent = new Student();          
          tempStudent._id = student._id;
          tempStudent.studentId = student.studentId;
          tempStudent.studentName = student.studentFirstName + ' ' + student.studentLastName;
          tempStudent.studentEmail = student.studentEmail;
          tempStudent.studentStatus = student.studentStatus;
          tempStudent.studentPaymentTotal = student.studentPaymentTotal;
          tempStudent.studentCoursesActive = 0;
          tempStudent.studentCoursesCompleted = 0;
          student.studentCourses.forEach(course => {
            if(course.status == 'active') { tempStudent.studentCoursesActive += 1; }
            else if(course.studentStatus == 'completed') { tempStudent.studentCoursesCompleted += 1; }
          });
          this.tableDataItems.tableRow.push(tempStudent);
        });
        this.tableData = new MatTableDataSource(this.tableDataItems.tableRow);
        this.tableData.sort = this.sort;    
      },
      err => {
        console.log('AdminUsers | error: ' + JSON.stringify(err));
      }
    )
  }

  onInfo(student) {
    this.dataService.adminGetStudentProfile(student).subscribe(
      res => {
        console.log('onInfo: ' + JSON.stringify(res));
      },
      err => {
        console.log(err);
      }
    )
  }

  onBlock(student) {
    student.studentStatus = !student.studentStatus;
    this.dataService.adminUpdateStudentStatus(student).subscribe(
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
