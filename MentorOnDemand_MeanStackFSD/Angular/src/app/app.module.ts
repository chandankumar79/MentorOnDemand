import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TestingComponent } from './testing/testing.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin/admin.component';
import { StudentComponent } from './student/student/student.component';
import { MentorComponent } from './mentor/mentor/mentor.component';
import { AppSidebarComponent } from './app-sidebar/app-sidebar.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AddSkillComponent } from './mentor/add-skill/add-skill.component';
import { TechAddComponent } from './admin/tech-add/tech-add.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CoursesComponent } from './courses/courses.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminMentorsComponent } from './admin/admin-mentors/admin-mentors.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminPaymentsComponent } from './admin/admin-payments/admin-payments.component';
import { AdminCoursesComponent } from './admin/admin-courses/admin-courses.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AddCourseComponent } from './student/add-course/add-course.component';
import { MentorCoursesComponent } from './mentor/mentor-courses/mentor-courses.component';
import { MentorNotificationsComponent } from './mentor/mentor-notifications/mentor-notifications.component';
import { MentorPaymentsComponent } from './mentor/mentor-payments/mentor-payments.component';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { StudentCoursesComponent } from './student/student-courses/student-courses.component';
import { CourseFilterPipe } from './shared/courses-filter.pipe';
import { StudentNotificationsComponent } from './student/student-notifications/student-notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    TestingComponent,
    HomeComponent,
    AdminComponent,
    StudentComponent,
    MentorComponent,
    AppSidebarComponent,
    AppNavbarComponent,
    AppFooterComponent,
    AddSkillComponent,
    TechAddComponent,
    ProfileComponent,
    CoursesComponent,
    ContactUsComponent,
    AdminMentorsComponent,
    AdminUsersComponent,
    AdminPaymentsComponent,
    AdminCoursesComponent,
    AdminDashboardComponent,
    AddCourseComponent,
    MentorCoursesComponent,
    MentorNotificationsComponent,
    MentorPaymentsComponent,
    SnackbarComponent,
    StudentCoursesComponent,
    CourseFilterPipe,
    StudentNotificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddCourseComponent]
})
export class AppModule { }
