import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  gender: number;
  role: string = 'student';

  profileForm: FormGroup;
  submitted = false;
  editable: boolean;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.gender = 1;
    this.role = this.userService.getRole();

    this.editable = false;

    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      linkedInProfile: ['', Validators.required],
      dateOfBirth: ['', [Validators.required]],
      experience: ['', this.role == 'mentor' ? [Validators.required] : []]
    });
    // * profile data
    this.getUserData();
  }

  selectGender(gender) {    
    if (this.editable) {
      this.gender = gender;
    }
  }

  get user() { return this.profileForm.controls; }

  onSave() {
    this.editable = false;
    this.profileForm.value.gender = this.gender;
    this.userService.updateUserProfile(this.profileForm.value).subscribe(
      res => {
        this.getUserData();
      },
      err => {
        console.log(err);
      }
    );
    this.getUserData(); // display data after updating
  }

  onCancel() {
    this.editable = false;
    this.getUserData();
  }

  onEdit() {
    this.editable = true;
  }

  getUserData() {
    this.userService.getUserProfile().subscribe(
      res => {
        // console.log(res);
        const user = res['user'];
        this.profileForm.controls.firstName.setValue(user.firstName);
        this.profileForm.controls.lastName.setValue(user.lastName);
        this.profileForm.controls.phoneNumber.setValue(user.phoneNumber);
        this.profileForm.controls.email.setValue(user.email);
        this.profileForm.controls.linkedInProfile.setValue(user.linkedInProfile);
        this.profileForm.controls.dateOfBirth.setValue(user.dateOfBirth);
        this.profileForm.controls.experience.setValue(user.experience);
        this.gender = user.gender;
      },
      err => {
        console.log(err);
      }
    );
  }
}
