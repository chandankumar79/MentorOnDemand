import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent implements OnInit {
  @Input() userType: string;
  sidebarMenu: any;

  constructor() { }

  sidebarMenuItems = {
    student: [
      { icon: 'fa-desktop', name: 'Dashboard', link: 'student-dashboard' },
      { icon: 'fa-address-card-o', name: 'Profile', link: 'student-profile' },
      { icon: 'fa-book', name: 'My Courses', link: 'student-courses' },
      { icon: 'fa-money', name: 'Payments', link: 'student-payments' },
    ],
    mentor: [
      { icon: 'fa-desktop', name: 'Dashboard', link: 'mentor-dashboard' },
      { icon: 'fa-address-card-o', name: 'Profile', link: 'mentor-profile' },
      { icon: 'fa-book', name: 'My Skills', link: 'mentor-courses' },
      { icon: 'fa-money', name: 'Payments', link: 'mentor-payments' },
      { icon: 'fa-bell', name: 'Notifications', link: 'mentor-notifications' },
      { icon: 'fa-plus-circle', name: 'Add Skill', link: 'add-skill' }
    ],
    admin: [
      { icon: 'fa-desktop', name: 'Dashboard', link: 'admin-dashboard' },
      { icon: 'fa-address-card-o', name: 'Profile', link: 'admin-profile' },
      { icon: 'fa-mortar-board', name: 'Mentors', link: 'admin-mentors' },
      { icon: 'fa-user', name: 'Students', link: 'admin-students' },
      { icon: 'fa-dollar', name: 'Payments', link: 'admin-payments' },
      { icon: 'fa-book', name: 'Technologies', link: 'admin-courses' },
      { icon: 'fa-plus-circle', name: 'Add Tech', link: 'add-tech' }
    ],
  };

  ngOnInit() {
    this.sidebarMenu = this.sidebarMenuItems[this.userType];
  }
}
