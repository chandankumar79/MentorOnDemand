import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { AuthGuard } from '../auth/auth.guard';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' })};
  getLoggedInStatus: EventEmitter<any> = new EventEmitter();
  getUserTypeValue: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private router: Router) {}

  register(user) {
    return this.http.post<any>(environment.apiAuthServicesBaseUrl + '/register', user);
  }

  login(authCredentials) {
    return this.http.post(environment.apiAuthServicesBaseUrl + '/login', authCredentials);
  }

  getUserProfile() {
    return this.http.get(`${environment.apiAuthServicesBaseUrl}/getProfile?` +
      `Email=${this.getUserEmail()}&Role=${this.getRole() === 'admin' ? 1 : this.getRole() === 'mentor' ? 2 : 3}`, this.noAuthHeader);
  }

  updateUserProfile(userData) {
    return this.http.put(`${environment.apiAuthServicesBaseUrl}/updateProfile`, userData);
  }

  // Helper Methods
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setUserEmail(email: string) {
    localStorage.setItem('userEmail', email);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setRole(userType: string) {
    this.getUserTypeValue.emit(userType);
    localStorage.setItem('role', userType);
  }

  getRole() {
    return localStorage.getItem('role');
  }

  getUserEmail() {
    return localStorage.getItem('userEmail');
  }

  clearLocalStorage() {
    localStorage.clear();
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
    this.http.post(`${environment.apiAuthServicesBaseUrl}/logout`, null).subscribe(res => {
      this.clearLocalStorage();
      this.getLoggedInStatus.emit(false);
      this.router.navigateByUrl('login');
    }, err => {
      console.log(err.error.message);
    });
  }

}
