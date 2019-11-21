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

  // done
  adminAddTech(tech) {
    return this.http.post(`${environment.apiAdminServicesBaseUrl}/admin/addTech`, tech);
  }

  // done
  adminUpdateTech(tech) {
    return this.http.put(`${environment.apiAdminServicesBaseUrl}/admin/updateTech/${tech.techId}`, tech);
  }

  // done
  getTechById(techId) {
    return this.http.get(`${environment.apiAdminServicesBaseUrl}/admin/getTechById/${techId}`);
  }

  // done
  adminGetTechnologies() {
    return this.http.get(`${environment.apiAdminServicesBaseUrl}/admin/getTechnologies`);
  }

  // done
  adminGetStudents() {
    return this.http.get(`${environment.apiAdminServicesBaseUrl}/admin/getStudents`);
  }

  adminGetStudentProfile(student) {
    return this.http.post(`${environment.apiAdminServicesBaseUrl}/admin/getStudentProfile`, student);
  }

  // done
  adminGetMentors() {
    return this.http.get(`${environment.apiAdminServicesBaseUrl}/admin/getMentors`);
  }

  adminGetMentorProfile(mentor) {
    return this.http.post(`${environment.apiAdminServicesBaseUrl}/admin/getMentorProfile`, mentor);
  }

  adminGetPayments() {
    return this.http.get(`${environment.apiAdminServicesBaseUrl}/admin/getPayments`);
  }

  // done
  adminUpdateUser(user) {
    return this.http.put(`${environment.apiAdminServicesBaseUrl}/admin/updateUser`, user);
  }

  getAdminDashboardData() {
    return this.http.get(`${environment.apiAdminServicesBaseUrl}/admin/getDashboardData`);
  }

  // * ======== mentor actions ======= *

  // homepage request
  _getCourses() {
    return this.http.get(`${environment.apiMentorServicesBaseUrl}/mentor/getTechnologies`);
  }

  // done
  mentorGetTechnologies() {
    return this.http.get(`${environment.apiMentorServicesBaseUrl}/mentor/getTechnologies`);
  }

  // done
  mentorAddSkill(skill) {
    return this.http.post(`${environment.apiMentorServicesBaseUrl}/mentor/addSkill`, skill);
  }

  // done
  mentorUpdateSkill(skill) {
    return this.http.put(`${environment.apiMentorServicesBaseUrl}/mentor/updateSkill`, skill);
  }

  // done
  mentorDeleteSkill(course) {
    const skillId = course.skillId;
    return this.http.delete(
      `${environment.apiMentorServicesBaseUrl}/mentor/deleteSkill?skillId=${skillId}&&email=${this.userService.getUserEmail()}`);
  }

  // done
  mentorGetSkillData(techId) {
    return this.http.get(
      `${environment.apiMentorServicesBaseUrl}/mentor/getSkillData?email=${this.userService.getUserEmail()}&techId=${techId}`);
  }

  // done
  mentorGetSkills() {
    return this.http.get(`${environment.apiMentorServicesBaseUrl}/mentor/getSkills/${this.userService.getUserEmail()}`);
  }

  // done
  getMentorNotifications(): any {
    return this.http.get(`${environment.apiMentorServicesBaseUrl}/mentor/getMentorNotifications/${this.userService.getUserEmail()}`);
  }

  // done
  mentorUpdateRequestStatus(course, status) {
    const data = { email: this.userService.getUserEmail(), courseId: course.courseId,  status };
    return this.http.post(`${environment.apiMentorServicesBaseUrl}/mentor/updateCourseStatus`, data);
  }

  mentorGetPayments() {
    return this.http.get(`${environment.apiMentorServicesBaseUrl}/mentor/getPayments/${this.userService.getUserEmail()}`);
  }

  // * ======== student actions ======= *
  // done
  studentGetTechnologies() {
    return this.http.get(`${environment.apiStudentServicesBaseUrl}/student/getTechnologies`);
  }
  // done
  studentAddCourse(skillId) {
    const addCourse = { email: this.userService.getUserEmail(), skillId };
    return this.http.post(`${environment.apiStudentServicesBaseUrl}/student/addCourse`, addCourse);
  }

  // done
  studentCoursePayment(courseId, paymentId) {
    const course = { email: this.userService.getUserEmail(), courseId, paymentId };
    return this.http.put(`${environment.apiStudentServicesBaseUrl}/student/updateCoursePayment`, course);
  }

  // done
  studentCourseCancel(courseId) {
    return this.http.put(
      `${environment.apiStudentServicesBaseUrl}/student/updateCourseCancel/${this.userService.getUserEmail()}`, courseId);
  }

  // done
  studentRateMentor(courseId, rating) {
    const course = { email: this.userService.getUserEmail(), courseId, rating };
    return this.http.put(`${environment.apiStudentServicesBaseUrl}/student/updateMentorRating`, course);
  }

  // done
  studentSetProgress(courseId, progress) {
    const course = { email: this.userService.getUserEmail(), courseId, progress };
    return this.http.put(`${environment.apiStudentServicesBaseUrl}/student/updateCourseProgress`, course);
  }

  // done
  studentGetMyCourses() {
    return this.http.get(`${environment.apiStudentServicesBaseUrl}/student/getCourses/${this.userService.getUserEmail()}`);
  }

  // done
  studentGetCourseMentors(techId) {
    return this.http.get(`${environment.apiStudentServicesBaseUrl}/student/getCourseMentors/${techId}`);
  }

  // done
  studentGetPayments() {
    return this.http.get(`${environment.apiStudentServicesBaseUrl}/student/getPayments/${this.userService.getUserEmail()}`);
  }

  // done
  searchCourses(searchFields) {
    return this.http.get(`${environment.apiStudentServicesBaseUrl}/student/search/${searchFields}`);
  }

}
