import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-admin-payments',
  templateUrl: './admin-payments.component.html',
  styleUrls: ['./admin-payments.component.scss']
})
export class AdminPaymentsComponent implements OnInit {
  tableTitle = 'Payments';
  tableData: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  studentList = {
    tableDisplayHeader: ['Student', 'Student\'s Email', 'Mentor', 'Course Id',
                          'Course Status', 'Total Fee', 'Commission', 'Payment Status', 'Payment Id'],
    tableHeader: ['studentName', 'studentEmail', 'mentorName', 'courseId',
                  'courseStatus', 'courseFee', 'courseCommission', 'paymentStatus', 'paymentId'],
    tableRow: [
      {studentName: 'Pronoy Sarkar', studentEmail: 'pronoy@student.com', mentorName: 'subham@mentor.com', courseId: 'Course#001',
        courseStatus: 'Pending', courseFee: '1000', courseCommission: '50', paymentStatus: 'Paid', paymentId: 'payid#001'},
      {studentName: 'Pronoy Sarkar', studentEmail: 'pronoy@student.com', mentorName: 'subham@mentor.com', courseId: 'Course#002',
        courseStatus: 'Active', courseFee: '1000', courseCommission: '50', paymentStatus: 'Paid', paymentId: 'payid#002'},
      {studentName: 'Pronoy Sarkar', studentEmail: 'pronoy@student.com', mentorName: 'subham@mentor.com', courseId: 'Course#003',
        courseStatus: 'Pending', courseFee: '1000', courseCommission: '50', paymentStatus: 'Due', paymentId: 'payid#003'},
      {studentName: 'Pronoy Sarkar', studentEmail: 'pronoy@student.com', mentorName: 'subham@mentor.com', courseId: 'Course#004',
        courseStatus: 'Pending', courseFee: '1000', courseCommission: '50', paymentStatus: 'Due', paymentId: 'payid#004'},
      {studentName: 'Pronoy Sarkar', studentEmail: 'pronoy@student.com', mentorName: 'subham@mentor.com', courseId: 'Course#005',
        courseStatus: 'Completed', courseFee: '1000', courseCommission: '50', paymentStatus: 'Paid', paymentId: 'payid#005'}
      ]
  };

  constructor() { }

  ngOnInit() {
    // TODO: implement sorting and paginator
    this.tableData = new MatTableDataSource(this.studentList.tableRow);
    this.tableData.sort = this.sort;
  }
}
