import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' })};
  getLoggedInStatus: EventEmitter<any> = new EventEmitter();
  getUserTypeValue: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private router: Router) {}

  login(authCredentials) {
    switch (authCredentials.userType) {
      case 'student': return this.http.post(environment.apiBaseUrl + '/authenticate/student', authCredentials, this.noAuthHeader);
      case 'mentor': return this.http.post(environment.apiBaseUrl + '/authenticate/mentor', authCredentials, this.noAuthHeader);
      case 'admin': return this.http.post(environment.apiBaseUrl + '/authenticate/admin', authCredentials, this.noAuthHeader);
      default: console.log('Invalid user type login used.');
    }
  }

  // * working: can get all profiles for all users
  getUserProfile() {
    return this.http.post(`${environment.apiBaseUrl}/userProfile`, {token: localStorage.getItem('token')});
  }

  updateUserProfile(userData) {
    return this.http.post(`${environment.apiBaseUrl}/userProfileUpdate`, userData);
  }

  // Helper Methods
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setUserType(userType: string) {
    this.getUserTypeValue.emit(userType);
    localStorage.setItem('userType', userType);
  }

  getUserType() {
    return localStorage.getItem('userType');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  logout() {
    this.deleteToken();
    this.getLoggedInStatus.emit(false);
    this.router.navigate(['/login']);
  }

}
