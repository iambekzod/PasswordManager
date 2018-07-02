import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  website: string;
  username: string;
  password: string;
  notes: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {website: 'paypal', username: 'aaa', password: 'bbb', notes: 'ccc'},
  {website: 'google', username: 'ddd', password: 'eee', notes: 'fff'},
  {website: 'dailymail', username: 'ggg', password: 'hhh', notes: 'iii'},
  {website: 'index', username: 'jjj', password: 'kkk', notes: 'lll'},
  {website: 'reddit', username: 'mmm', password: 'nnn', notes: 'ooo'},
  {website: 'ebay', username: 'ppp', password: 'qqq', notes: 'rrr'},
  {website: 'amazon', username: 'sss', password: 'ttt', notes: 'uuu'},
  {website: 'uoft', username: 'vvv', password: 'www', notes: 'xxx'}
];

/**
 * @title Table with filtering
 */
@Component({
  selector: 'password-table',
  styleUrls: ['password-table.component.css'],
  templateUrl: 'password-table.component.html',
})
export class PasswordTableComponent {
  displayedColumns: string[] = ['website', 'username', 'password', 'notes'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
