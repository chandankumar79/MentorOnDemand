import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  serverErrorMessages: string;
  userType: string;
  student: string;
  mentor: string;
  admin: string;
  dashboardLink: string;

  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
  ) { }

  get user() { return this.loginForm.controls; }

  selectUserType(userType) {
    this.userType = userType;
    switch (this.userType) {
      case 'student': this.student = 'active'; this.mentor = ''; this.admin = ''; break;
      case 'mentor': this.student = ''; this.mentor = 'active'; this.admin = ''; break;
      case 'admin': this.student = ''; this.mentor = ''; this.admin = 'active'; break;
    }
  }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      // TODO: change this to go to student or mentor dashboard
      // TODO: change student and mentor profiles to a single userProfile and manage pages based on user type
      // this.router.navigateByUrl('/userProfile');
      switch (this.userService.getUserType()) {
        case 'student': this.router.navigateByUrl('student'); break;
        case 'mentor': this.router.navigateByUrl('mentor'); break;
        case 'admin': this.router.navigateByUrl('admin'); break;
        default: this.router.navigateByUrl('login');
      }
      console.log('User already logged in');
    }

    this.userType = 'student';
    this.student = 'active';
    this.mentor = '';
    this.admin = '';

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loginForm.value.userType = this.userType;

    console.log('Login Component | onSubmit: ' + JSON.stringify(this.loginForm.value));
    if (this.loginForm.invalid) { /* console.log('LoginComponent | onSubmit: if executed.'); */ return; }

    // continue to call login service
    this.userService.login(this.loginForm.value).subscribe(
      res => {
        // console.log('Login Component | onSubmit | ServiceCall > res: ' + JSON.stringify(res));
        this.userService.setToken(res['token']);
        this.userService.setUserType(res['userType']);
        this.userService.getLoggedInStatus.emit(true); // emit login status
        this.router.navigateByUrl('/home');   // TODO: change required here
        // console.log('Login Successful!');
      },
      err => {
        // console.log('Login Component | onSubmit | ServiceCall > err: ' + JSON.stringify(err));
        this.serverErrorMessages = err.err.message;
      }
    );
  }
}
