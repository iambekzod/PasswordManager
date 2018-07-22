import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';

export interface PeriodicElement {
  id: string;
  website: string;
  username: string;
  password: string;
  notes: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: '1231asd', website: 'paypal', username: 'aaa', password: 'bbb', notes: 'ccc'},
  {id: '1231asd', website: 'google', username: 'ddd', password: 'eee', notes: 'fff'},
  {id: '1231asd', website: 'dailymail', username: 'ggg', password: 'hhh', notes: 'iii'},
  {id: '1231asd', website: 'index', username: 'jjj', password: 'kkk', notes: 'lll'},
  {id: '1231asd', website: 'reddit', username: 'mmm', password: 'nnn', notes: 'ooo'},
  {id: '1231asd', website: 'ebay', username: 'ppp', password: 'qqq', notes: 'rrr'},
  {id: '1231asd', website: 'amazon', username: 'sss', password: 'ttt', notes: 'uuu'},
  {id: '1231asd', website: 'uoft', username: 'vvv', password: 'www', notes: 'xxx'}
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
  displayedColumns: string[] = ['website', 'username', 'password', 'notes', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private router: Router) { }

  editItem(item: PeriodicElement) {
    this.router.navigate(['/edit', item.id])
  }
  deleteItem(item: Item) {
    //  this.store.dispatch(new itemsActions.Delete(item.id));
   }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
