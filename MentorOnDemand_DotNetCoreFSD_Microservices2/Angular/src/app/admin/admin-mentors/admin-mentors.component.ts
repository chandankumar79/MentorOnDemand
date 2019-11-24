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
    tableHeader: ['name', 'email', 'totalRating', 'skillsCount', 'status', 'action'],
    tableRow: []
  };

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // TODO: implement sorting and paginator
    this.getMentorData();
  }

  getMentorData() {
    this.tableDataItems.tableRow = [];
    this.dataService.adminGetMentors().subscribe(
      res => {
        console.log(this.tableData);
        const mentors = res['mentors'];
        this.tableData = new MatTableDataSource(mentors);
        this.tableData.sort = this.sort;
        // console.log(this.tableData);
      },
      err => {
        console.log('AdminMentors | error: ' + JSON.stringify(err));
      }
    );
  }

  // onInfo(mentor) {
  //   this.dataService.adminGetMentorProfile(mentor).subscribe(
  //     res => {
  //       console.log('onInfo: ' + JSON.stringify(res));
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   )
  // }

  onBlock(mentor) {
    mentor.status = !mentor.status;
    // console.log(mentor);
    this.dataService.adminUpdateUser(mentor).subscribe(
      res => {
        // console.log(res);
        this.getMentorData();
      },
      err => {
        console.log(err);
      }
    )
  }
}
