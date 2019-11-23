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
    return this.http.post(`${environment.apiAdminServicesBaseUrl}/addTech`, tech);
  }

  // done
  adminUpdateTech(tech) {
    return this.http.put(`${environment.apiAdminServicesBaseUrl}/updateTech/${tech.techId}`, tech);
  }

  // done
  getTechById(techId) {
    return this.http.get(`${environment.apiAdminServicesBaseUrl}/getTechById/${techId}`);
  }

  // done
  adminGetTechnologies() {
    
    return this.http.get(`${environment.apiAdminServicesBaseUrl}/getTechnologies`);
  }

  // done
  adminGetStudents() {
    return this.http.get(`${environment.apiAdminServicesBaseUrl}/getStudents`);
  }

  adminGetStudentProfile(student) {
    return this.http.post(`${environment.apiAdminServicesBaseUrl}/getStudentProfile`, student);
  }

  // done
  adminGetMentors() {
    return this.http.get(`${environment.apiAdminServicesBaseUrl}/getMentors`);
  }

  adminGetMentorProfile(mentor) {
    return this.http.post(`${environment.apiAdminServicesBaseUrl}/getMentorProfile`, mentor);
  }

  adminGetPayments() {
    return this.http.get(`${environment.apiAdminServicesBaseUrl}/getPayments`);
  }

  // done
  adminUpdateUser(user) {
    return this.http.put(`${environment.apiAdminServicesBaseUrl}/updateUser`, user);
  }

  getAdminDashboardData() {
    return this.http.get(`${environment.apiAdminServicesBaseUrl}/getDashboardData`);
  }

  // * ======== mentor actions ======= *

  // homepage request
  _getCourses() {
    return this.http.get(`${environment.apiMentorServicesBaseUrl}/getTechnologies`);
  }

  // done
  mentorGetTechnologies() {
    return this.http.get(`${environment.apiMentorServicesBaseUrl}/getTechnologies`);
  }

  // done
  mentorAddSkill(skill) {
    return this.http.post(`${environment.apiMentorServicesBaseUrl}/addSkill`, skill);
  }

  // done
  mentorUpdateSkill(skill) {
    return this.http.put(`${environment.apiMentorServicesBaseUrl}/updateSkill`, skill);
  }

  // done
  mentorDeleteSkill(course) {
    const skillId = course.skillId;
    return this.http.delete(
      `${environment.apiMentorServicesBaseUrl}/deleteSkill?skillId=${skillId}&&email=${this.userService.getUserEmail()}`);
  }

  // done
  mentorGetSkillData(techId) {
    return this.http.get(
      `${environment.apiMentorServicesBaseUrl}/getSkillData?email=${this.userService.getUserEmail()}&techId=${techId}`);
  }

  // done
  mentorGetSkills() {
    return this.http.get(`${environment.apiMentorServicesBaseUrl}/getSkills/${this.userService.getUserEmail()}`);
  }

  // done
  getMentorNotifications(): any {
    return this.http.get(`${environment.apiMentorServicesBaseUrl}/getMentorNotifications/${this.userService.getUserEmail()}`);
  }

  // done
  mentorUpdateRequestStatus(course, status) {
    const data = { email: this.userService.getUserEmail(), courseId: course.courseId,  status };
    return this.http.post(`${environment.apiMentorServicesBaseUrl}/updateCourseStatus`, data);
  }

  mentorGetPayments() {
    return this.http.get(`${environment.apiMentorServicesBaseUrl}/getPayments/${this.userService.getUserEmail()}`);
  }

  // * ======== student actions ======= *
  // done
  studentGetTechnologies() {
    return this.http.get(`${environment.apiStudentServicesBaseUrl}/getTechnologies`);
  }
  // done
  studentAddCourse(skillId) {
    const addCourse = { email: this.userService.getUserEmail(), skillId };
    return this.http.post(`${environment.apiStudentServicesBaseUrl}/addCourse`, addCourse);
  }

  // done
  studentCoursePayment(courseId, paymentId) {
    const course = { email: this.userService.getUserEmail(), courseId, paymentId };
    return this.http.put(`${environment.apiStudentServicesBaseUrl}/updateCoursePayment`, course);
  }

  // done
  studentCourseCancel(courseId) {
    return this.http.put(
      `${environment.apiStudentServicesBaseUrl}/updateCourseCancel/${this.userService.getUserEmail()}`, courseId);
  }

  // done
  studentRateMentor(courseId, rating) {
    const course = { email: this.userService.getUserEmail(), courseId, rating };
    return this.http.put(`${environment.apiStudentServicesBaseUrl}/updateMentorRating`, course);
  }

  // done
  studentSetProgress(courseId, progress) {
    const course = { email: this.userService.getUserEmail(), courseId, progress };
    return this.http.put(`${environment.apiStudentServicesBaseUrl}/updateCourseProgress`, course);
  }

  // done
  studentGetMyCourses() {
    return this.http.get(`${environment.apiStudentServicesBaseUrl}/getCourses/${this.userService.getUserEmail()}`);
  }

  // done
  studentGetCourseMentors(techId) {
    return this.http.get(`${environment.apiStudentServicesBaseUrl}/getCourseMentors/${techId}`);
  }

  // done
  studentGetPayments() {
    return this.http.get(`${environment.apiStudentServicesBaseUrl}/getPayments/${this.userService.getUserEmail()}`);
  }

  // done
  searchCourses(searchFields) {
    return this.http.get(`${environment.apiStudentServicesBaseUrl}/search/${searchFields}`);
  }

}
