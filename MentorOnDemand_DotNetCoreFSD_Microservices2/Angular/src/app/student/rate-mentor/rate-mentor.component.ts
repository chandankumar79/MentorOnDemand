import { Component, OnInit, Inject } from '@angular/core';
import { MentorCoursesComponent } from 'src/app/mentor/mentor-courses/mentor-courses.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-rate-mentor',
  templateUrl: './rate-mentor.component.html',
  styleUrls: ['./rate-mentor.component.scss']
})
export class RateMentorComponent implements OnInit {
  mentorName: string;
  rating = 0;

  constructor(
    public dialogRef: MatDialogRef<MentorCoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.data.course);
    this.mentorName = this.data.course.mentorName;
  }

  selectStar(star) {
    this.rating = star;
  }

  onSubmit() {
    this.dialogRef.close(this.rating);
  }

  onCancel() {
    this.dialogRef.close();
  }

}
