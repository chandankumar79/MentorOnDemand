import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-mentor-payments',
  templateUrl: './mentor-payments.component.html',
  styleUrls: ['./mentor-payments.component.scss']
})
export class MentorPaymentsComponent implements OnInit {
  tableTitle = 'My Courses';
  tableData: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  tableDataItems = {
    tableDisplayHeader: [ ],
    tableHeader: [ 'paymentId', 'dateOfTransaction', 'amount', 'transactionType' ],
    tableRow: []
  };
  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.dataService.mentorGetPayments().subscribe(
      res => {
        console.log(res);
        // tslint:disable-next-line: no-string-literal
        this.tableData = new MatTableDataSource(res['payments']);
        this.tableData.sort = this.sort;
      },
      err => {
        console.log(err);
      }
    );
  }

}
