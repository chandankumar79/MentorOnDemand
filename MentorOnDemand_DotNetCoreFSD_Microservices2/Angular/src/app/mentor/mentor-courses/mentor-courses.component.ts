import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-mentor-courses',
  templateUrl: './mentor-courses.component.html',
  styleUrls: ['./mentor-courses.component.scss']
})
export class MentorCoursesComponent implements OnInit {
  tableTitle = 'My Skills';
  tableData: MatTableDataSource<any>;
  skills: any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  tableDataItems = {
    tableDisplayHeader: [ ],
    tableHeader: ['name', 'basicFee', 'commission', 'skillSurcharge', 'totalFee', 'startDate', 'endDate', 'activeStudents', 'action'],
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
        console.log(res);
        // tslint:disable-next-line: no-string-literal
        this.skills = res['skills'];
        this.tableData = new MatTableDataSource(this.skills);
        this.tableData.sort = this.sort;
      },
      err => {
        console.log(err);
      }
    );
  }

  onRemove(course) {
    console.log('delete request received!');
    console.log(course);
    course.activeStudents = 0;
    if (course.activeStudents === 0) {
      // TODO: block further applications
      this.dataService.mentorDeleteSkill(course).subscribe(
        res => {
          // TODO: show no data found message
          console.log(res);
          this.getTableData();
        },
        err => {
          // TODO: show error message
          console.log(err.error);
        }
      )
    }
  }

  onEdit(course) {
    // console.log(course);
    let editSkill;
    this.skills.forEach(skill => {
      if (course.Name === skill.Name) {
        editSkill = skill;
        return;
      }
    });
    // TODO:
    this.router.navigateByUrl('mentor/add-skill', { state: editSkill });
  }
}
