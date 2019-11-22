import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss'],
})
export class MentorComponent implements OnInit {
  userType: string;
  constructor() { }

  ngOnInit() {
    this.userType = 'mentor';
  }

}
