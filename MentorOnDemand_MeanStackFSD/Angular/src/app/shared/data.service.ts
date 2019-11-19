import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  courses: EventEmitter<any> = new EventEmitter();
  coursesCount: EventEmitter<number> = new EventEmitter();
  addTechEditable: boolean; // to reuse admin add tech for editing as well
  addTechSelectedCourse: any; //
  mentorEditSkill: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  addTechEditableStatus(flag) {
    this.addTechEditable = flag;
  }

  addTechEditableCourse(course) {
    this.addTechSelectedCourse = course;
  }

  // TODO: change here
  addTech(course) {
    return this.http.post(`${environment.apiBaseUrl}/add/tech`, course);
  }

  getCourses() {
    return this.http.get(`${environment.apiBaseUrl}/courses`).subscribe(
      res => {
        this.courses.emit(res['courses']);
        this.coursesCount.emit(res['courses'].length);
      },
      err => {
        console.log(err);
      }
    );
  }

  getCourses2() {
    return this.http.get(`${environment.apiBaseUrl}/courses`);
  }

  adminGetStudents() {
    return this.http.get(`${environment.apiBaseUrl}/admin/getStudents`);
  }

  adminGetStudentProfile(student) {
    return this.http.post(`${environment.apiBaseUrl}/admin/getStudentProfile`, student);
  }

  adminGetMentors() {
    return this.http.get(`${environment.apiBaseUrl}/admin/getMentors`);
  }

  adminGetMentorProfile(mentor) {
    return this.http.post(`${environment.apiBaseUrl}/admin/getMentorProfile`, mentor);
  }

  adminGetPayments() {

  }

  adminUpdateCourse(course) {
    return this.http.post(`${environment.apiBaseUrl}/admin/updateCourse`, course);
  }

  adminUpdateMentorStatus(mentor) {
    return this.http.post(`${environment.apiBaseUrl}/admin/updateMentor`, mentor);
  }

  adminUpdateStudentStatus(student) {
    return this.http.post(`${environment.apiBaseUrl}/admin/updateStudent`, student);
  }

  // * ======== mentor actions ======= *

  mentorAddSkill(course) {
    course = { token: this.userService.getToken(), data: course };
    return this.http.post(`${environment.apiBaseUrl}/mentor/addSkill`, course);
  }

  mentorUpdateSkill(course) {
    course = { token: this.userService.getToken(), data: course };
    return this.http.post(`${environment.apiBaseUrl}/mentor/updateCourse`, course);
  }

  mentorGetSkillData() {
    // TODO: .....
  }

  mentorGetSkills() {
    const reqData = {token: this.userService.getToken()};
    return this.http.post(`${environment.apiBaseUrl}/mentor/getSkills`, reqData);
  }

  setMentorEditSkill(editatable, course) {
    this.mentorEditSkill.emit({ editatable, course });
  }

  getMentorNotifications(): any {
    const user = { token: this.userService.getToken() };
    return this.http.post(`${environment.apiBaseUrl}/mentor/getMentorNotifications`, user);
  }

  mentorUpdateRequestStatus(data) {
    return this.http.post(`${environment.apiBaseUrl}/mentor/updateRequestStatus`, data);
  }

  // * ======== student actions ======= *

  studentAddCourse(selectedMentor) {
    console.log('dataService: ' + JSON.stringify(selectedMentor));
    const addCourse = { token: this.userService.getToken(), data: selectedMentor };
    return this.http.post(`${environment.apiBaseUrl}/student/addCourse`, addCourse);
  }

  studentGetMyCourses() {
    const user = {token: this.userService.getToken()};
    return this.http.post(`${environment.apiBaseUrl}/student/getMyCourses`, user);
  }

  getCourseMentors(course) {
    return this.http.post(`${environment.apiBaseUrl}/getCourseMentors`, course);
  }

  getStudentNotifications(): any {
    const user = { token: this.userService.getToken() };
    return this.http.post(`${environment.apiBaseUrl}/student/getStudentNotifications`, user);
  }

  studentUpdateRequestStatus(data) {
    return this.http.post(`${environment.apiBaseUrl}/student/updateRequestStatus`, data);
  }


  searchCourses(searchFields) {
    console.log('DataService | searchCourses: ' + JSON.stringify(searchFields));
    return this.http.get(`${environment.apiBaseUrl}/search`, searchFields);
  }

}
