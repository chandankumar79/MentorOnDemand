import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DataService } from 'src/app/shared/data.service';
import { pipe } from 'rxjs';
import { delay } from 'q';

export class Mentor {
  // tslint:disable-next-line: variable-name
  _id: string;
  mentorId: string;
  mentorName: string;
  mentorEmail: string;
  mentorRatings: string;
  mentorCoursesCount: string;
  mentorPaymentDue: string;
  mentorPaymentCompleted: string;
  mentorStatus: string;
}

@Component({
  selector: 'app-admin-mentors',
  templateUrl: './admin-mentors.component.html',
  styleUrls: ['./admin-mentors.component.scss']
})
export class AdminMentorsComponent implements OnInit {
  tableTitle = 'Mentor List';
  tableData: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  tableDataItems = {
    tableDisplayHeader: ['Name', 'Email', 'Ratings', 'Total Courses',
                          'Payment Due', 'Payment Payment Completed', 'Status', 'Action'],
    tableHeader: ['mentorName', 'mentorEmail', 'mentorRatings', 'mentorCoursesCount',
                  'mentorPaymentDue', 'mentorPaymentCompleted', 'mentorStatus', 'mentorAction'],
    tableRow: []
  };

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // TODO: implement sorting and paginator
    this.getMentorData();
  }

  // ! data not getting updated in frontend
  getMentorData() {
    this.tableDataItems.tableRow = [];
    this.dataService.adminGetMentors().subscribe(
      res => {
        // console.log('AdminMentors | response: ' + JSON.stringify(res.mentors));
        const mentors = res['mentors'];
        mentors.forEach(mentor => {
          const tempMentor = new Mentor();
          tempMentor._id = mentor._id;
          tempMentor.mentorId = mentor.mentorId;
          tempMentor.mentorName = mentor.mentorFirstName + ' ' + mentor.mentorLastName;
          tempMentor.mentorEmail = mentor.mentorEmail;
          tempMentor.mentorRatings = mentor.mentorRatings;
          tempMentor.mentorCoursesCount = mentor.mentorCourses.length;
          tempMentor.mentorPaymentDue = mentor.mentorPaymentDue;
          tempMentor.mentorPaymentCompleted = mentor.mentorPaymentCompleted;
          tempMentor.mentorStatus = mentor.mentorStatus;
          this.tableDataItems.tableRow.push(tempMentor);
        });
        this.tableData = new MatTableDataSource(this.tableDataItems.tableRow);
        this.tableData.sort = this.sort;    
        // console.log(this.mentorList.tableRow);
      },
      err => {
        console.log('AdminMentors | error: ' + JSON.stringify(err));
      }
    );
  }

  onInfo(mentor) {
    this.dataService.adminGetMentorProfile(mentor).subscribe(
      res => {
        console.log('onInfo: ' + JSON.stringify(res));
      },
      err => {
        console.log(err);
      }
    )
  }

  onBlock(mentor) {
    mentor.mentorStatus = !mentor.mentorStatus;
    this.dataService.adminUpdateMentorStatus(mentor).subscribe(
      res => {
        console.log(res);
        this.getMentorData();
      },
      err => {
        console.log(err);
      }
    )
  }
}
