import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
  @Input() userType: string;
  sidebarMenu: any;

  constructor(private router: Router) { }

  sidebarMenuItems = {
    student: [
      {icon: 'fa-desktop', name: 'Dashboard', link: 'student'}, // TODO: check if student exists
      {icon: 'fa-address-card-o', name: 'Profile', link: 'student-profile' },
      {icon: 'fa-book', name: 'My Courses', link: 'student-courses'},
      {icon: 'fa-money', name: 'Payments', link: ''},
      {icon: 'fa-bell', name: 'Notifications', link: 'student-notifications'},
    ],
    mentor: [
      {icon: 'fa-desktop', name: 'Dashboard', link: 'mentor' },
      {icon: 'fa-address-card-o', name: 'Profile', link: 'mentor-profile' },
      {icon: 'fa-book', name: 'My Courses', link: 'mentor-courses' },
      {icon: 'fa-money', name: 'Payments', link: 'mentor-payments' },
      {icon: 'fa-bell', name: 'Notifications', link: 'mentor-notifications' },
      {icon: 'fa-plus-circle', name: 'Add Skill', link: 'add-skill'}
    ],
    admin: [
      {icon: 'fa-bell', name: 'Notifications', link: 'admin'},
      {icon: 'fa-address-card-o', name: 'Profile', link: 'admin-profile' },
      {icon: 'fa-mortar-board', name: 'Mentor', link: 'admin-mentors'},
      {icon: 'fa-user', name: 'User', link: 'admin-students'},
      {icon: 'fa-dollar', name: 'Payments', link: 'admin-payments'},
      {icon: 'fa-book', name: 'Courses', link: 'admin-courses'},
      {icon: 'fa-plus-circle', name: 'Add Courses', link: 'add-tech'}
    ],
  };

  ngOnInit() {
    this.sidebarMenu = this.sidebarMenuItems[this.userType];
  }
}
