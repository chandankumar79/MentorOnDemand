import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) { }

  register(user) {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

}
