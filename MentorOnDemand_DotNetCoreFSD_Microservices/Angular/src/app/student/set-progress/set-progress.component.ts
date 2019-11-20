import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StudentCoursesComponent } from '../student-courses/student-courses.component';

@Component({
  selector: 'app-set-progress',
  templateUrl: './set-progress.component.html',
  styleUrls: ['./set-progress.component.scss']
})
export class SetProgressComponent implements OnInit {
  courseName: string;
  progress: number = 0;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<StudentCoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.courseName = this.data.course.courseName;
    this.progress = this.data.course.progress;
  }

  setProgress(value) {
    if(value > this.progress) {
      this.progress = value;
    }
  }

  onSubmit() {
    this.dialogRef.close(this.progress);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
