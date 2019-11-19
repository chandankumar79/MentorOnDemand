import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { MustMatch } from '../_helper/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  gender: string;
  male: string;
  female: string;

  userType: string;
  student: string;
  mentor: string;

  registerForm: FormGroup;
  submitted = false;

  showSuccessMessage: boolean;
  serverErrorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.gender = 'male';
    this.male = 'active';
    this.female = '';

    this.userType = 'student';
    this.student = 'active';
    this.mentor = '';

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      linkedInProfile: ['', Validators.required],
      dob: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
    }, {
      validator: MustMatch('password', 'passwordConfirm')
    });
  }

  selectGender(gender) {
    this.gender = gender;
    switch (this.gender) {
      case 'male': this.male = 'active'; this.female = ''; break;
      case 'female': this.male = ''; this.female = 'active'; break;
    }
  }

  selectUserType(userType) {
    this.userType = userType;
    switch (this.userType) {
      case 'mentor': this.mentor = 'active'; this.student = ''; break;
      case 'student': this.mentor = ''; this.student = 'active'; break;
    }
  }

  get user() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // * add addition data to registration form
    // TODO implement auto fetching for them as well
    this.registerForm.value.userType = this.userType;
    this.registerForm.value.sex = this.gender === 'male' ? true : false;
    console.log('RegisterComponent | onSubmit: ' + JSON.stringify(this.registerForm.value));

    // stop her if the form is invalid
    if (this.registerForm.invalid) {/* console.log('if executed: ');  this.submitted = false;*/ return; } // TODO: remove console.log()

    this.registerService.register(this.registerForm.value)
      .subscribe(
        res => {
          console.log('Registration successful!');
          this.showSuccessMessage = true;
          setTimeout(() => this.showSuccessMessage = false, 4000);
          this.registerForm.reset();
          this.router.navigate(['/login']);
        },
        err => {
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
