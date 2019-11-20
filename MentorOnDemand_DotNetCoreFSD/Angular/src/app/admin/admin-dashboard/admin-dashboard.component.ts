import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  dashboardData: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dashboardData = {
      studentsActive: 0, studentsBlocked: 0,
      mentorsActive: 0, mentorsBlocked: 0,
      technologiesActive: 0, technologiesBlocked: 0,
      registeredSkills: 0, registeredCourses: 0
    }
    this.getDashboardData();
  }

  getDashboardData() {
    this.dataService.getAdminDashboardData().subscribe(
      res => {
        this.dashboardData = res['dashboardData'];
      }, err => {
        console.log(err);
      }
    )
  }

}
