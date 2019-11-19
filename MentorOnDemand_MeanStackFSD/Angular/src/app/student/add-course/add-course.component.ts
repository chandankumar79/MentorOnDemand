import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HomeComponent } from 'src/app/home/home.component';
import { CoursesComponent } from 'src/app/courses/courses.component';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  tableTitle = 'Select Mentor';
  tableData: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

coursesList = {
    tableDisplayHeader: ['Mentor', 'Rating', 'Start Date', 'End Date', 'Action'],
    tableHeader: ['mentorName', 'courseExperience', 'courseRating', 'courseDuration', 'courseStartDate',
                  'courseEndDate', 'courseTotalFee', 'studentAction'],
    tableRow: [ ]
  };

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onSelect(selectedMentor) {
    this.dataService.studentAddCourse(selectedMentor).subscribe(
      res => {
        this.dialogRef.close(res['message']);
      },
      err => {
        this.dialogRef.close(err.error);
      }
    );
  }

  ngOnInit() {
    this.getCourseMentors(this.data.course);
  }

  getCourseMentors(course) {
    this.dataService.getCourseMentors(course).subscribe(
      res => {
        console.log(res);
        const mentorCourses = res['courseMentors'];
        mentorCourses.forEach((element, index) => {
          mentorCourses[index]['courseTotalFee'] = (element.courseFee as number) * (
            1 + 0.01 * (element.courseCommission as number + element.courseMentorSurcharge as number) 
          );
        });
        this.tableData = new MatTableDataSource(mentorCourses);
        this.tableData.sort = this.sort;
      },
      err => {
        console.log(err);
      }
    );
  }
}
