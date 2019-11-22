import { Component, OnInit, Input } from '@angular/core';
// import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit {
  @Input() userType: string;
  @Input() tableData: any;
  tableTitle: string;
  tableHeaders: any;
  tableDataItems: any;
  badgeColor = {Pending: 'primary', Approved: 'success', Rejected: 'danger'};

  // constructor(private adminService: AdminService) { }
  constructor() { }

  ngOnInit() {
    // this.tableData = this.adminService.mentorList;
    this.tableTitle = this.tableData.tableTitle;
    this.tableHeaders = this.tableData.tableHeaders;
    this.tableDataItems = this.tableData.tableDataItems;
  }
}

