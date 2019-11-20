import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-student-notifications',
  templateUrl: './student-notifications.component.html',
  styleUrls: ['./student-notifications.component.scss']
})
export class StudentNotificationsComponent implements OnInit {
  tableTitle = 'Notifications';
  tableData: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  notificationsList = {
    tableDisplayHeader: [],
    tableHeader: ['courseId', 'courseName', 'mentorName', 'courseStatus', 'studentNotificationAction'],
    tableRow: [ ]
  };

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // TODO: implement sorting and paginator
    this.getStudentNotifications();
  }

  getStudentNotifications() {
    // this.dataService.getStudentNotifications().subscribe(
    //   res => {
    //     this.tableData = new MatTableDataSource(res['notifications']);
    //     this.tableData.sort = this.sort;
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

}
