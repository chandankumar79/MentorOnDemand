import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {
  tableTitle = 'Courses';
  tableData: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  tableItems = {
    tableDisplayHeader: ['Course Id', 'Name', 'Fee', 'Commission', 'Status', 'Active Students', 'Active Mentors', 'Action'],
    tableHeader: ['courseId', 'courseName', 'courseFee', 'courseCommission', 'courseStudents',
                  'courseMentors', 'courseStatus', 'courseAction'],
    tableRow: [ ]
  };

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.getTableData()
    // TODO: implement sorting and paginator
  }

  getTableData() {
    this.dataService.getCourses2().subscribe(res => {
      this.tableData = new MatTableDataSource(res['courses']);
      this.tableData.sort = this.sort;
    });
  }

  onEdit(course) {
    this.dataService.addTechEditableStatus(true); // make editable
    this.dataService.addTechEditableCourse(course);
    console.log(course);
    this.router.navigateByUrl('admin/add-tech');
  }

  onBlock(course) {
    course.courseStatus = !course.courseStatus;
    this.dataService.adminUpdateCourse(course).subscribe(
      res => {
        console.log(res);
        // * refresh data
        this.getTableData();
      },
      err => {
        console.log(err);
      }
    );
  }

}
