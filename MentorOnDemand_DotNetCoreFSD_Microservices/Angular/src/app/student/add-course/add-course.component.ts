import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HomeComponent } from 'src/app/home/home.component';
import { CoursesComponent } from 'src/app/courses/courses.component';
import { DataService } from 'src/app/shared/data.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  tableTitle = 'Select Mentor';
  tableData: MatTableDataSource<any>;
  mentors: any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  tableDataItems = {
    tableDisplayHeader: ['Mentor', 'Experience', 'Rating', 'Start Date', 'End Date', 'Course Fee', 'Action'],
    tableHeader: ['skillId', 'mentorName', 'experience', 'totalRating', 'ratingsCount', 'startDate', 'endDate', 'totalFee', 'action'],
    tableRow: [ ]
  };

  constructor(
    private dataService: DataService,
    private userService: UserService,
    public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.getCourseMentors(this.data.course);
    this.tableTitle = `Available Mentors for ${this.data.course.name}`;
  }

  onSelect(selectedMentor) {
    if (this.userService.getUserEmail() != null) {
      this.dataService.studentAddCourse(selectedMentor.skillId).subscribe(
        res => {
          this.dialogRef.close(res);
        },
        err => {
          this.dialogRef.close(err);
        }
      );
    } else {
      this.dialogRef.close({ message: 'You must be logged in to apply for courses'});
    }
  }

  getCourseMentors(course) {
    // console.log(course);
    this.dataService.studentGetCourseMentors(course.techId).subscribe(
      res => {
        this.mentors = res['mentors'];
        this.tableData = new MatTableDataSource(this.mentors);
        this.tableData.sort = this.sort;
      },
      err => {
        console.log(err);
      }
    );
  }
}
