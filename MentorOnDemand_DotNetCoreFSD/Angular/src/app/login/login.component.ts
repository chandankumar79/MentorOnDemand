import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { LoginService } from './login.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  serverErrorMessages: string;
  role: string = 'null';

  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  get user() { return this.loginForm.controls; }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      // console.log('User already logged in');     
      this.role = this.userService.getRole();
      this.router.navigateByUrl(this.role);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;

    console.log('Login Component | onSubmit: ' + JSON.stringify(this.loginForm.value));
    if (this.loginForm.invalid) { /* console.log('LoginComponent | onSubmit: if executed.'); */ return; }

    // continue to call login service
    this.userService.login(this.loginForm.value).subscribe(
      res => {
        console.log('Login Component | onSubmit | ServiceCall > res: ' + JSON.stringify(res));
        this.userService.setToken(res['token']);
        this.userService.setRole(res['role'] == 1 ? 'admin' : res['role'] == 2? 'mentor': 'student');
        this.userService.setUserEmail(res['email']);
        this.userService.getLoggedInStatus.emit(true); // emit login status
        this.router.navigateByUrl('/home');   // TODO: change required here
        console.log('Login Successful!');
      },
      err => {
        // console.log('Login Component | onSubmit | ServiceCall > err: ' + JSON.stringify(err));
        this.serverErrorMessages = err.err.message;
      }
    );
  }
}
