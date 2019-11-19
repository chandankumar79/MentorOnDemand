import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-mentor-payments',
  templateUrl: './mentor-payments.component.html',
  styleUrls: ['./mentor-payments.component.scss']
})
export class MentorPaymentsComponent implements OnInit {
  tableTitle = 'My Payments';
  tableData: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  mentorList = {
    tableDisplayHeader: ['Course Id', 'Name', 'My Rating', 'Start Date', 'End Date', 'Active Students', 'Action'],
    tableHeader: ['courseId', 'studentId', 'paymentSlot', 'paymentAmount', 'paymentDue', 'paymentId'],
    tableRow: [
      {courseId: 'course001', studentId: 'student001', paymentSlot: '25%', paymentAmount: '250', paymentDue: '75%', paymentId: 'payment#001'},
      {courseId: 'course001', studentId: 'student002', paymentSlot: '25%', paymentAmount: '250', paymentDue: '75%', paymentId: 'payment#002'},
      {courseId: 'course001', studentId: 'student003', paymentSlot: '100%', paymentAmount: '250', paymentDue: '0%', paymentId: 'payment#003'},
      {courseId: 'course001', studentId: 'student004', paymentSlot: '50%', paymentAmount: '250', paymentDue: '50%', paymentId: 'payment#004'},
      {courseId: 'course001', studentId: 'student005', paymentSlot: '75%', paymentAmount: '250', paymentDue: '25%',  paymentId: 'payment#005'}
    ]
  };

  constructor() { }

  ngOnInit() {
    // TODO: implement sorting and paginator
    this.tableData = new MatTableDataSource(this.mentorList.tableRow);
    this.tableData.sort = this.sort;
  }
}
