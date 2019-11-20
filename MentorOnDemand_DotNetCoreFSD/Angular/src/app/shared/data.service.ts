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

  // done
  adminAddTech(tech) {
    return this.http.post(`${this.apiBaseUrl}/admin/addTech`, tech);
  }

  // done
  adminUpdateTech(tech) {
    return this.http.put(`${this.apiBaseUrl}/admin/updateTech/${tech.techId}`, tech);
  }

  // done
  getTechById(techId) {
    return this.http.get(`${this.apiBaseUrl}/admin/getTechById/${techId}`);
  }

  // done
  adminGetTechnologies() {
    return this.http.get(`${this.apiBaseUrl}/admin/getTechnologies`);
  }

  // done
  adminGetStudents() {
    return this.http.get(`${this.apiBaseUrl}/admin/getStudents`);
  }

  adminGetStudentProfile(student) {
    return this.http.post(`${this.apiBaseUrl}/admin/getStudentProfile`, student);
  }

  // done
  adminGetMentors() {
    return this.http.get(`${this.apiBaseUrl}/admin/getMentors`);
  }

  adminGetMentorProfile(mentor) {
    return this.http.post(`${this.apiBaseUrl}/admin/getMentorProfile`, mentor);
  }

  adminGetPayments() {
    return this.http.get(`${this.apiBaseUrl}/admin/getPayments`);
  }

  // done
  adminUpdateUser(user) {
    return this.http.put(`${this.apiBaseUrl}/admin/updateUser`, user);
  }

  // * ======== mentor actions ======= *

  // homepage request
  _getCourses() {
    return this.http.get(`${this.apiBaseUrl}/mentor/getTechnologies`);
  }

  // done
  mentorGetTechnologies() {
    return this.http.get(`${this.apiBaseUrl}/mentor/getTechnologies`);
  }

  // done
  mentorAddSkill(skill) {
    return this.http.post(`${this.apiBaseUrl}/mentor/addSkill`, skill);
  }

  // done
  mentorUpdateSkill(skill) {
    return this.http.put(`${this.apiBaseUrl}/mentor/updateSkill`, skill);
  }

  // done
  mentorDeleteSkill(course) {
    const skillId = course.skillId;
    return this.http.delete(`${this.apiBaseUrl}/mentor/deleteSkill?skillId=${skillId}&&email=${this.userService.getUserEmail()}`);
  }

  // done
  mentorGetSkillData(techId) {
    return this.http.get(`${this.apiBaseUrl}/mentor/getSkillData?email=${this.userService.getUserEmail()}&techId=${techId}`);
  }

  // done
  mentorGetSkills() {
    return this.http.get(`${this.apiBaseUrl}/mentor/getSkills/${this.userService.getUserEmail()}`);
  }

  // done
  getMentorNotifications(): any {
    return this.http.get(`${this.apiBaseUrl}/mentor/getMentorNotifications/${this.userService.getUserEmail()}`);
  }

  // done
  mentorUpdateRequestStatus(course, status) {
    const data = { email: this.userService.getUserEmail(), courseId: course.courseId,  status };
    return this.http.post(`${this.apiBaseUrl}/mentor/updateCourseStatus`, data);
  }

  mentorGetPayments() {
    return this.http.get(`${this.apiBaseUrl}/mentor/getPayments/${this.userService.getUserEmail()}`);
  }

  // * ======== student actions ======= *
  // done
  studentGetTechnologies() {
    return this.http.get(`${this.apiBaseUrl}/student/getTechnologies`);
  }
  // done
  studentAddCourse(skillId) {
    const addCourse = { email: this.userService.getUserEmail(), skillId };
    return this.http.post(`${this.apiBaseUrl}/student/addCourse`, addCourse);
  }

  // done
  studentCoursePayment(courseId, paymentId) {
    const course = { email: this.userService.getUserEmail(), courseId, paymentId };
    return this.http.put(`${this.apiBaseUrl}/student/updateCoursePayment`, course);
  }

  // done
  studentCourseCancel(courseId) {
    return this.http.put(`${this.apiBaseUrl}/student/updateCourseCancel/${this.userService.getUserEmail()}`, courseId);
  }

  // done
  studentRateMentor(courseId, rating) {
    const course = { email: this.userService.getUserEmail(), courseId, rating };
    return this.http.put(`${this.apiBaseUrl}/student/updateMentorRating`, course);
  }

  // done
  studentSetProgress(courseId, progress) {
    const course = { email: this.userService.getUserEmail(), courseId, progress };
    return this.http.put(`${this.apiBaseUrl}/student/updateCourseProgress`, course);
  }

  // done
  studentGetMyCourses() {
    return this.http.get(`${this.apiBaseUrl}/student/getCourses/${this.userService.getUserEmail()}`);
  }

  // done
  studentGetCourseMentors(techId) {
    return this.http.get(`${this.apiBaseUrl}/student/getCourseMentors/${techId}`);
  }

  // done
  studentGetPayments() {
    return this.http.get(`${this.apiBaseUrl}/student/getPayments/${this.userService.getUserEmail()}`);
  }

  // done
  searchCourses(searchFields) {
    return this.http.get(`${this.apiBaseUrl}/student/search/${searchFields}`);
  }

}
