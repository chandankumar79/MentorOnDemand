import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-student-payments',
  templateUrl: './student-payments.component.html',
  styleUrls: ['./student-payments.component.scss']
})
export class StudentPaymentsComponent implements OnInit {
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
    this.dataService.studentGetPayments().subscribe(
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
