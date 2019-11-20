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
    tableHeader: [ 'courseId', 'course', 'student', 'startDate', 'endDate', 'progress', 'status', 'action'],
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
    this.dataService.mentorUpdateRequestStatus(course, 'accepted').subscribe(
      res => {
        console.log(res);
        this.getMentorNotifications();
      },
      err => {
        console.log(err);
      }
    );
  }

  onReject(course) {
    course.courseStatus = 'Rejected';
    this.dataService.mentorUpdateRequestStatus(course, 'rejected').subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
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
