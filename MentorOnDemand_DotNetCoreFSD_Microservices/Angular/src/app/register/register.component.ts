import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../_helper/must-match.validator';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  gender: number;
  role: number;

  registerForm: FormGroup;
  submitted = false;

  showSuccessMessage: boolean;
  serverErrorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.gender = 1;
    this.role = 3;

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      linkedInProfile: [''],
      dateOfBirth: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
      experience: [0, [Validators.required, Validators.min(0)]]
    }, {
      validator: MustMatch('password', 'passwordConfirm')
    });
  }

  selectGender(gender) {
    this.gender = gender;
  }

  selectRole(role) {
    this.role = role;
  }

  get user() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // * add addition data to registration form
    // this.registerForm.value.role = 1;
    this.registerForm.value.role = this.role;
    this.registerForm.value.gender = this.gender;
    // TODO: remove confirm password
    // console.log('RegisterComponent | onSubmit: ' + JSON.stringify(this.registerForm.value));

    // stop her if the form is invalid
    if (this.registerForm.invalid) {/* console.log('if executed: ');  this.submitted = false;*/ return; } // TODO: remove console.log()

    this.userService.register(this.registerForm.value)
      .subscribe(
        res => {
          console.log('Registration successful!');
          console.log(res);
          console.log(res['message']);
          this.showSuccessMessage = true;
          setTimeout(() => this.showSuccessMessage = false, 4000);
          this.registerForm.reset();
          this.router.navigate(['/login']);
        },
        err => {
          console.log(err);
          if (err.status === 422) {
            this.serverErrorMessage = err.error.join('<br>');
          } else {
            this.serverErrorMessage = 'Something went wrong. Please try again!';
          }
        },
      );
  }

  cancelRegistration() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
