import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  mentorList: any;
  studentList: any;

  // ? dummy data for now

  // mentorTable = {
  //   tableTitle: 'Notifications',
  //   tableHeaders: ['Name', 'Date', 'Role', 'Request', 'Status', 'Action'],
  //   tableDataItems: [
  //     {name: 'Michael Holz', date: '04/10/2013', role: 'Mentor', request: 'Payment', status: 'Pending'},
  //     {name: 'Paula Wilson', date: '05/08/2014', role: 'Mentor', request: 'Add Skill', status: 'Approved'},
  //     {name: 'Antonio Moreno', date: '11/05/2015', role: 'Mentor', request: 'Payment', status: 'Pending'},
  //     {name: 'Mary Saveley', date: '06/09/2016', role: 'Mentor', request: 'Delete Skill', status: 'Pending'},
  //     {name: 'Martin Sommer', date: 'xx/08/2017', role: 'Mentor', request: 'Add Skill', status: 'Rejected'}
  //   ]
  // };

  // ? end of dummy data

  constructor() { }

  // * --- not sure what to make of it yet
  // @Output() mentorList: EventEmitter<any> = new EventEmitter();
  // setMentorList() {
  //   this.mentorList.emit(this.mentorTable);
  // }
  // constructor() {
  //   this.mentorList.emit(this.mentorTable);
  // }
  // * end ---

}
