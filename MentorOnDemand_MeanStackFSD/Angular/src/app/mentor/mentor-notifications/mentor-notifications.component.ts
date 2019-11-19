import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-mentor-notifications',
  templateUrl: './mentor-notifications.component.html',
  styleUrls: ['./mentor-notifications.component.scss']
})
export class MentorNotificationsComponent implements OnInit {
  tableTitle = 'Notifications';
  tableData: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  notificationsList = {
    tableDisplayHeader: [],
    tableHeader: ['courseId', 'courseName', 'studentName', 'courseStatus', 'mentorNotificationAction'],
    tableRow: [ ]
  };

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // TODO: implement sorting and paginator
    this.getMentorNotifications();
  }

  getMentorNotifications() {
    this.dataService.getMentorNotifications().subscribe(
      res => {
        this.tableData = new MatTableDataSource(res['notifications']);
        this.tableData.sort = this.sort;
      },
      err => {
        console.log(err);
      }
    );
  }

  onAccept(course) {
    course.courseStatus = 'Approved';
    this.dataService.mentorUpdateRequestStatus(course).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  onReject(course) {
    course.courseStatus = 'Rejected';
    this.dataService.mentorUpdateRequestStatus(course).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
