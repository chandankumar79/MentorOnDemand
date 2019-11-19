import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  gender: string;
  male: string;
  female: string;

  profileForm: FormGroup;
  submitted = false;
  editable: boolean;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.gender = 'male';
    this.male = 'active';
    this.female = '';

    this.editable = false;

    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      linkedInProfile: ['', Validators.required],
      dob: ['', [Validators.required]],
    });
    // * profile data
    this.getUserData();
  }

  selectGender(gender) {
    if (this.editable) {
      this.gender = gender;
      switch (this.gender) {
        case 'male': this.male = 'active'; this.female = ''; break;
        case 'female': this.male = ''; this.female = 'active'; break;
      }
    }
  }

  get user() { return this.profileForm.controls; }

  onSave() {
    this.editable = false;
    // TODO: save data to database
    this.userService.updateUserProfile({ token: this.userService.getToken(), data: this.profileForm.value }).subscribe(
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
    // TODO: .....
    this.userService.getUserProfile().subscribe(
      res => {
        const user = res['user'];
        switch (this.userService.getUserType()) {
          case 'student': {
            this.profileForm.controls.firstName.setValue(user.studentFirstName);
            this.profileForm.controls.lastName.setValue(user.studentLastName);
            this.profileForm.controls.contactNumber.setValue(user.studentContactNumber);
            this.profileForm.controls.email.setValue(user.studentEmail);
            this.profileForm.controls.linkedInProfile.setValue(user.studentLinkedInProfile);
            this.profileForm.controls.dob.setValue(user.studentDOB);
            break;
          }
          case 'mentor': {
            this.profileForm.controls.firstName.setValue(user.mentorFirstName);
            this.profileForm.controls.lastName.setValue(user.mentorLastName);
            this.profileForm.controls.contactNumber.setValue(user.mentorContactNumber);
            this.profileForm.controls.email.setValue(user.mentorEmail);
            this.profileForm.controls.linkedInProfile.setValue(user.mentorLinkedInProfile);
            this.profileForm.controls.dob.setValue(user.mentorDOB);
            break;
          }
          case 'admin': {
            this.profileForm.controls.firstName.setValue(user.adminFirstName);
            this.profileForm.controls.lastName.setValue(user.adminLastName);
            this.profileForm.controls.contactNumber.setValue(user.adminContactNumber);
            this.profileForm.controls.email.setValue(user.adminEmail);
            this.profileForm.controls.linkedInProfile.setValue(user.adminLinkedInProfile);
            this.profileForm.controls.dob.setValue(user.adminDOB);
            break;
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
