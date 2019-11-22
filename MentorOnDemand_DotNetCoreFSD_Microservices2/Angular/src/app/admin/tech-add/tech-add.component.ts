import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-tech-add',
  templateUrl: './tech-add.component.html',
  styleUrls: ['./tech-add.component.scss']
})
export class TechAddComponent implements OnInit {
  addTechForm: FormGroup;
  submitted: boolean;
  editable = false;
  selectedCourse: any;
  techId: number;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private userService: UserService,
    private router: Router
  ) {
    this.initFormFields();
    const techObj = this.router.getCurrentNavigation().extras.state;
    if (techObj != null) {
      this.techId = techObj.techId;
      this.setFormFields();
    }
   }

  ngOnInit() { this.submitted = false; }

  initFormFields() {
    this.addTechForm = this.formBuilder.group({
      techId: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      description: ['', Validators.required],
      imgSourceLink: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      basicFee: ['', [Validators.required, Validators.min(0)]],
      duration: ['', Validators.required],
      commission: ['', [Validators.required, Validators.min(0), Validators.max(50)]],
    });
  }

  setFormFields() {
    console.log(this.techId);
    this.dataService.getTechById(this.techId).subscribe(
      res => {
        console.log('res ' + JSON.stringify(res));
        this.selectedCourse = res['tech'];
        this.addTechForm.controls.techId.setValue(this.selectedCourse.techId);
        this.addTechForm.controls.name.setValue(this.selectedCourse.name);
        this.addTechForm.controls.description.setValue(this.selectedCourse.description);
        this.addTechForm.controls.imgSourceLink.setValue(this.selectedCourse.imgSourceLink);
        this.addTechForm.controls.basicFee.setValue(this.selectedCourse.basicFee);
        this.addTechForm.controls.commission.setValue(this.selectedCourse.commission);
        this.addTechForm.controls.duration.setValue(this.selectedCourse.duration);
      },
      err => {
        console.log('err ' + JSON.stringify(err));
      }
    );
  }

  get techFormControls() { return this.addTechForm.controls; }

  onTechUpdate() {
    console.log('update request sending');
    // update data
    const techForm = this.addTechForm.value;
    techForm.techId = this.selectedCourse.techId;
    techForm.status = this.selectedCourse.status;
    this.dataService.adminUpdateTech(techForm).subscribe(
      res => {
        console.log(res);
        this.router.navigateByUrl('admin/admin-courses');
      },
      err => {
        console.log(err);
      }
    );
  }

  onCancel() {
    this.router.navigateByUrl('admin/admin-courses');
  }

  onSubmit() {
    this.submitted = true;

    console.log(this.addTechForm.value);
    if (this.addTechForm.invalid) { return; }

    // update data
    const techData = this.addTechForm.value;
    delete techData.techId;
    techData.userEmail = this.userService.getUserEmail();

    this.dataService.adminAddTech(techData)
      .subscribe(
        res => {
          console.log('Course Added successfully!');
          // TODO: note: on successfully submitting the form need to clear the fields but not show red outline kind of error case
          // * reset data field items
          // this.submitted = false;
          // this.addTechForm.reset();
          // this.addTechForm.errors.clear();
          this.router.navigateByUrl('admin/admin-courses');
        },
        err => {
          console.log(err);
        }
      );
  }

}
