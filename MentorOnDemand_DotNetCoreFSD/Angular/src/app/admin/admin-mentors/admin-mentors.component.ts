import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DataService } from 'src/app/shared/data.service';
import { pipe } from 'rxjs';
import { delay } from 'q';

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
    tableHeader: ['name', 'email', 'rating', 'skillsCount', 'status', 'action'],
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
        console.log('AdminMentors | response: ' + JSON.stringify(res));
        const mentors = res['users'];
        mentors.forEach(mentor => {
          let tempMentor = {
            name: mentor.name,
            email: mentor.email,
            // rating: mentor.ratings,
            rating: 0,
            skillsCount: 0,
            status: mentor.status
          }
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
    mentor.status = !mentor.status;    
    console.log(mentor);
    this.dataService.adminUpdateUser(mentor).subscribe(
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
