import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss']
})
export class AddSkillComponent implements OnInit {
  editable = false;
  selectedCourse: any;

  pageTitle = 'Add Course';
  submitted: boolean;
  courses: any;
  technology: any;
  skillForm: FormGroup;
  startDateMin = new Date();
  endDateMin = new Date();
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private userService: UserService,
    private router: Router,
    ) {
      this.selectedCourse = this.router.getCurrentNavigation().extras.state;
      if (this.selectedCourse != null) { this.editable = true; }
  }

  ngOnInit() {
    this.submitted = false;
    this.initFormFields();
    if (this.editable) { this.pageTitle = 'Update Course'; this.setSkillFormEdit(this.selectedCourse); } // in case of edit

    // get list of technologies
    this.dataService.mentorGetTechnologies().subscribe(res => {
      this.courses = res['courses'];
    }, err => {
      console.log(err);
    });
  }

  initFormFields() {
    this.skillForm = this.formBuilder.group({
      name: [{ value: '', disabled: this.editable }, Validators.required],
      basicFee: [{ value: '', disabled: true }],
      commission: [{ value: '', disabled: true }],
      skillSurcharge: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      totalFee: [{ value: '', disabled: true }],
      duration: [{ value: '', disabled: true }],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  get skillFormControls() { return this.skillForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if the form is invalid
    if (this.skillForm.invalid) { return; }

    const skillData = this.skillForm.value;
    skillData.email = this.userService.getUserEmail();
    skillData.techId = this.selectedCourse.techId;

    this.dataService.mentorAddSkill(skillData).subscribe(
      res => {
        console.log(res);
        this.message = res['message'];
        this.router.navigateByUrl('mentor/mentor-courses');
      },
      err => {
        console.log(err);
        this.message = err.error['message'];
      }
    );
  }

  onUpdate() {
    this.submitted = true;

    // stop her if the form is invalid
    if (this.skillForm.invalid) { return; }

    const skillData = this.skillForm.value;
    skillData.email = this.userService.getUserEmail();
    skillData.techId = this.selectedCourse.techId;

    this.dataService.mentorUpdateSkill(skillData).subscribe(
      res => {
        // console.log(res);
        this.message = res['message'];
        this.router.navigateByUrl('mentor/mentor-courses');
      },
      err => {
        console.log(err);
        this.message = err.error['message'];
      }
    );
  }

  onCancel() {
    this.skillForm.reset();
    this.router.navigateByUrl('mentor/mentor-courses');
  }

  setSkillForm(selectedCourse) {
    console.log(selectedCourse);
    this.selectedCourse = selectedCourse;
    this.skillForm.controls.duration.setValue(selectedCourse.duration);
    this.skillForm.controls.basicFee.setValue(selectedCourse.basicFee);
    this.skillForm.controls.commission.setValue(selectedCourse.commission);
    this.skillForm.controls.skillSurcharge.setValue(0);
    this.calculateTotalFee();
    this.skillForm.controls.startDate.setValue(new Date());
    this.skillForm.controls.endDate.setValue(new Date());
    this.calculateCourseEndDate();
  }

  setSkillFormEdit(selectedCourse) {
    console.log(selectedCourse);
    this.dataService.getTechById(selectedCourse.techId).subscribe(
      res => {
        this.technology = res['tech'];
        this.skillForm.controls.name.setValue(this.technology.name);
        this.skillForm.controls.basicFee.setValue(this.technology.basicFee);
        this.skillForm.controls.commission.setValue(this.technology.commission);
        this.skillForm.controls.duration.setValue(this.technology.duration);
      },
      err => {
        console.log(err);
      }
    );
    this.dataService.mentorGetSkillData(selectedCourse.techId).subscribe(
      res => {
        const skill = res['skill'];
        this.skillForm.controls.skillSurcharge.setValue(skill.skillSurcharge);
        this.skillForm.controls.startDate.setValue(skill.startDate);
        this.skillForm.controls.endDate.setValue(skill.endDate);
        this.skillForm.controls.totalFee.setValue(skill.totalFee);
        this.calculateCourseEndDate();
      },
      err => {
        console.log(err);
      }
    );
  }

  calculateTotalFee() {
    const totalFee = (this.skillForm.controls.basicFee.value as number) * (
      1 + 0.01 * (this.skillForm.controls.commission.value as number)
        + 0.01 * (this.skillForm.controls.skillSurcharge.value as number));
    this.skillForm.controls.totalFee.setValue(totalFee.toFixed()); // round of number
  }

  calculateCourseEndDate() {
    const startDate = new Date(this.skillForm.controls.startDate.value);
    // const endDate = new Date(this.skillForm.controls.endDate.value);
    startDate.setDate(startDate.getDate() + 0);
    this.endDateMin = new Date();
    this.endDateMin.setDate(startDate.getDate() + (this.skillForm.controls.duration.value as number));
    this.skillForm.controls.startDate.setValue(startDate);
    this.skillForm.controls.endDate.setValue(this.endDateMin);
    // console.log(`start date ${startDate}, startDateMin ${this.startDateMin}, endDateMin ${this.endDateMin} -- ${startDate.getDate()}`);
  }
}