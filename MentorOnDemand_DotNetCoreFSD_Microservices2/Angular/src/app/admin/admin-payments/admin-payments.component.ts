import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-admin-payments',
  templateUrl: './admin-payments.component.html',
  styleUrls: ['./admin-payments.component.scss']
})
export class AdminPaymentsComponent implements OnInit {
  tableTitle = 'My Courses';
  tableData: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  tableDataItems = {
    tableDisplayHeader: [ ],
    tableHeader: [ 'paymentId', 'userEmail', 'userName', 'userRole', 'dateOfTransaction', 'amount', 'transactionType' ],
    tableRow: []
  };
  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.dataService.adminGetPayments().subscribe(
      res => {
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
