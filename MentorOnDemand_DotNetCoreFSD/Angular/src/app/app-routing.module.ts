import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TestingComponent } from './testing/testing.component';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student/student.component';
import { MentorComponent } from './mentor/mentor/mentor.component';
import { AdminComponent } from './admin/admin/admin.component';
import { TechAddComponent } from './admin/tech-add/tech-add.component';
import { AddSkillComponent } from './mentor/add-skill/add-skill.component';
import { AuthGuard } from './auth/auth.guard';
import { CoursesComponent } from './courses/courses.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminMentorsComponent } from './admin/admin-mentors/admin-mentors.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminPaymentsComponent } from './admin/admin-payments/admin-payments.component';
import { AdminCoursesComponent } from './admin/admin-courses/admin-courses.component';
import { MentorCoursesComponent } from './mentor/mentor-courses/mentor-courses.component';
import { MentorPaymentsComponent } from './mentor/mentor-payments/mentor-payments.component';
import { MentorNotificationsComponent } from './mentor/mentor-notifications/mentor-notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { StudentCoursesComponent } from './student/student-courses/student-courses.component';
import { MentorDashboardComponent } from './mentor/mentor-dashboard/mentor-dashboard.component';
import { StudentPaymentsComponent } from './student/student-payments/student-payments.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'student-profile', pathMatch: 'full' },
      { path: 'student-profile', component: ProfileComponent },
      { path: 'student-courses', component: StudentCoursesComponent },
      { path: 'student-payments', component: StudentPaymentsComponent },
    ]
  },
  {
    path: 'mentor', component: MentorComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'mentor-dashboard', pathMatch: 'full' },
      { path: 'add-skill', component: AddSkillComponent },
      { path: 'mentor-courses', component: MentorCoursesComponent },
      { path: 'mentor-payments', component: MentorPaymentsComponent },
      { path: 'mentor-notifications', component: MentorNotificationsComponent },
      { path: 'mentor-profile', component: ProfileComponent },
      { path: 'mentor-dashboard', component: MentorDashboardComponent }
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'add-tech', component: TechAddComponent },
      { path: 'admin-mentors', component: AdminMentorsComponent },
      { path: 'admin-students', component: AdminUsersComponent },
      { path: 'admin-payments', component: AdminPaymentsComponent },
      { path: 'admin-courses', component: AdminCoursesComponent } ,
      { path: 'admin-profile', component: ProfileComponent }
    ]
   },
  { path: 'testing', component: TestingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
