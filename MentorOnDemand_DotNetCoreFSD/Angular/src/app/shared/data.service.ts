import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  apiBaseUrl = environment.apiBaseUrl;
  userEmail = this.userService.getUserEmail();

  adminAddTech(tech) {
    return this.http.post(`${this.apiBaseUrl}/admin/addTech`, tech);
  }

  adminUpdateTech(tech) {
    return this.http.put(`${this.apiBaseUrl}/admin/updateTech/${tech.techId}`, tech);
  }

  getTechById(techId) {
    return this.http.get(`${this.apiBaseUrl}/admin/getTechById/${techId}`);
  }

  // getCourses2() {
  //   return this.http.get(`${this.apiBaseUrl}/admin/getTechnologies`);
  // }

  adminGetTechnologies() {
    return this.http.get(`${this.apiBaseUrl}/admin/getTechnologies`);
  }

  adminGetStudents() {
    return this.http.get(`${this.apiBaseUrl}/admin/getStudents`);
  }

  adminGetStudentProfile(student) {
    return this.http.post(`${this.apiBaseUrl}/admin/getStudentProfile`, student);
  }

  adminGetMentors() {
    return this.http.get(`${this.apiBaseUrl}/admin/getMentors`);
  }

  adminGetMentorProfile(mentor) {
    return this.http.post(`${this.apiBaseUrl}/admin/getMentorProfile`, mentor);
  }

  adminGetPayments() {

  }

  adminUpdateUser(user) {
    return this.http.put(`${this.apiBaseUrl}/admin/updateUser`, user);
  }

  // * ======== mentor actions ======= *

  // homepage request
  _getCourses() {
    return this.http.get(`${this.apiBaseUrl}/mentor/getTechnologies`);
  }

  mentorGetTechnologies() {
    return this.http.get(`${this.apiBaseUrl}/mentor/getTechnologies`);
  }

  mentorAddSkill(skill) {
    return this.http.post(`${this.apiBaseUrl}/mentor/addSkill`, skill);
  }

  mentorUpdateSkill(skill) {
    return this.http.put(`${this.apiBaseUrl}/mentor/updateSkill`, skill);
  }

  mentorDeleteSkill(course) {
    const skillId = course.skillId;
    return this.http.delete(`${this.apiBaseUrl}/mentor/deleteSkill?skillId=${skillId}&&email=${this.userEmail}`);
  }

  mentorGetSkillData(techId) {
    return this.http.get(`${this.apiBaseUrl}/mentor/getSkillData?email=${this.userEmail}&techId=${techId}`);
  }

  mentorGetSkills() {
    return this.http.get(`${this.apiBaseUrl}/mentor/getSkills/${this.userEmail}`);
  }

  getMentorNotifications(): any {
    return this.http.get(`${this.apiBaseUrl}/mentor/getMentorNotifications/${this.userEmail}`);
  }

  mentorUpdateRequestStatus(course, status) {
    const data = { email: this.userEmail, courseId: course.courseId,  status };
    return this.http.post(`${this.apiBaseUrl}/mentor/updateCourseStatus`, data);
  }

  // * ======== student actions ======= *

  studentGetTechnologies() {
    return this.http.get(`${this.apiBaseUrl}/student/getTechnologies`);
  }
  // done
  studentAddCourse(skillId) {
    const addCourse = { email: this.userEmail, skillId };
    return this.http.post(`${this.apiBaseUrl}/student/addCourse`, addCourse);
  }

  studentCoursePayment(courseId, paymentId) {
    const course = { email: this.userEmail, courseId, paymentId };
    return this.http.put(`${this.apiBaseUrl}/student/updateCoursePayment`, course);
  }

  studentCourseCancel(courseId) {
    return this.http.put(`${this.apiBaseUrl}/student/updateCourseCancel/${this.userEmail}`, courseId);
  }

  studentRateMentor(courseId, rating) {
    const course = { email: this.userEmail, courseId, rating };
    return this.http.put(`${this.apiBaseUrl}/student/updateMentorRating`, course);
  }

  studentSetProgress(courseId, progress) {
    const course = { email: this.userEmail, courseId, progress };
    return this.http.put(`${this.apiBaseUrl}/student/updateCourseProgress`, course);
  }

  studentGetMyCourses() {
    return this.http.get(`${this.apiBaseUrl}/student/getCourses/${this.userEmail}`);
  }

  // done
  studentGetCourseMentors(techId) {
    return this.http.get(`${this.apiBaseUrl}/student/getCourseMentors/${techId}`);
  }
  // TODO: remove -- to be replaced by above method
  getCourseMentors(course) {
    return this.http.post(`${this.apiBaseUrl}/getCourseMentors`, course);
  }

  getStudentNotifications(): any {
    const user = { token: this.userService.getToken() };
    return this.http.post(`${this.apiBaseUrl}/student/getStudentNotifications`, user);
  }

  studentUpdateRequestStatus(data) {
    return this.http.post(`${this.apiBaseUrl}/student/updateRequestStatus`, data);
  }


  searchCourses(searchFields) {
    console.log('DataService | searchCourses: ' + JSON.stringify(searchFields));
    return this.http.get(`${this.apiBaseUrl}/search`, searchFields);
  }

}
