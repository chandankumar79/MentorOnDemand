import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {
  tableTitle = 'Technologies';
  tableData: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  tableItems = {
    tableDisplayHeader: ['Tech Id', 'Name', 'Fee', 'Commission', 'Status', 'Active Students', 'Active Mentors', 'Action'],
    tableHeader: ['techId', 'name', 'basicFee', 'commission', 'duration', 'status', 'action'],
    tableRow: [ ]
  };

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.getTableData();
    // TODO: implement sorting and paginator
  }

  getTableData() {
    this.dataService.adminGetTechnologies().subscribe(res => {
      const data = res['courses'];
      this.tableData = new MatTableDataSource(data);
      this.tableData.sort = this.sort;
    });
  }

  onEdit(course) {
    this.router.navigateByUrl('admin/add-tech', { state: { techId: course.techId } });
  }

  onBlock(course) {
    course.status = !course.status;
    this.dataService.adminUpdateTech(course).subscribe(
      res => {
        console.log(res);
        // * refresh data
        this.getTableData();
      },
      err => {
        console.log(err);
      }
    );
  }

}
