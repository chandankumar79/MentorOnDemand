import { Component, OnInit, Output } from '@angular/core';
// import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userType: string;
  tableData: any;

  // constructor(private adminService: AdminService) { }
  constructor() { }

  ngOnInit() {
    this.userType = 'admin';
    // this.tableData = {
    //   tableTitle: 'Notifications',
    //   tableHeaders: ['Name', 'Email', 'Date of Joining', 'No of Courses', 'Status', 'Action'],
    //   tableDataItems: [
    //     {name: 'Michael Holz', date: '04/10/2013', role: 'Mentor', request: 'Payment', status: 'Pending'},
    //     {name: 'Paula Wilson', date: '05/08/2014', role: 'Mentor', request: 'Add Skill', status: 'Approved'},
    //     {name: 'Antonio Moreno', date: '11/05/2015', role: 'Mentor', request: 'Payment', status: 'Pending'},
    //     {name: 'Mary Saveley', date: '06/09/2016', role: 'Mentor', request: 'Delete Skill', status: 'Pending'},
    //     {name: 'Martin Sommer', date: '12/08/2017', role: 'Mentor', request: 'Add Skill', status: 'Rejected'}
    //   ]
    // };

    // this.adminService.mentorList = this.tableData;
  }
}
