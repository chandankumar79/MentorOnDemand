import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';

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
    private router: Router,
    public dialog: MatDialog,
    private snackbar: MatSnackBar
    ) { }

  get user() { return this.loginForm.controls; }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
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
    if (this.loginForm.invalid) { return; }

    // continue to call login service
    this.userService.login(this.loginForm.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.userService.setRole(res['role'] == 1 ? 'admin' : res['role'] == 2? 'mentor': 'student');
        this.userService.setUserEmail(res['email']);
        this.userService.getLoggedInStatus.emit(true); // emit login status
        this.router.navigateByUrl('/home');   // TODO: change required here
      },
      err => {
        this.displaySnackbar('Unauthorized: Email or password is incorrect');
      }
    );
  }

  displaySnackbar(message, color = 'red') {
    const config = new MatSnackBarConfig() ;
    config.duration = 10000;
    config.panelClass = [`snackbar-${color}`];
    this.snackbar.open(message, '', config);
  }
}
