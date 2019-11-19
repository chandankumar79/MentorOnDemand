import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-mentor-courses',
  templateUrl: './mentor-courses.component.html',
  styleUrls: ['./mentor-courses.component.scss']
})
export class MentorCoursesComponent implements OnInit {
  tableTitle = 'My Courses';
  tableData: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  mentorList = {
    tableDisplayHeader: [ ],
    tableHeader: ['courseId', 'courseName', 'courseRating', 'courseStartDate', 'courseEndDate', 'mentorAction'],
    tableRow: []
  };

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    // TODO: implement sorting and paginator
    this.getTableData();
  }

  getTableData() {
    this.dataService.mentorGetSkills().subscribe(
      res => {
        // tslint:disable-next-line: no-string-literal
        const mentorCourses = res['mentorCourses'];
        this.tableData = new MatTableDataSource(mentorCourses);
        this.tableData.sort = this.sort;
      },
      err => {
        console.log(err);
      }
    );
  }

  onRemove(course) {
    if (course.activeStudents === 0) {
      // TODO: block further applications
    }
  }

  async onEdit(course) {
    await this.dataService.setMentorEditSkill(true, course);
    this.router.navigateByUrl('mentor/add-skill');
  }
}
