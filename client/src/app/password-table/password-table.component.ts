import {Component} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Password } from '../api/_password';
import { PasswordDataService } from '../api/password-data.service';

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
  dataSource: MatTableDataSource<Password>;

  ngOnInit() {
    this.passwords();
  }

  constructor(
    private router: Router,
    private passwordDataService: PasswordDataService
  ) {
  }

  // onAddPassword(password) {
  //   this.passwordDataService.addPassword(password);
  // }

  // onRemovePassword(password) {
  //   this.passwordDataService.deletePasswordById(password.id);
  // }

  passwords() {
    return this.passwordDataService.getAllPasswords();
  }

  // filterPasswords(filter) {
  //   return this.passwordDataService.getAllFilterPasswords(filter);
  // }

  editPassword(item: Password) {
    this.router.navigate(['/edit', item.id])
  }

  applyFilter(filterValue: string) {
    this.passwords()
    // this.filterPasswords(filterValue).toPromise().then(function (data) {
    //   console.log(data);
    // });
    // let dataSource = new MatTableDataSource();

    // dataSource.filter = filterValue.trim().toLowerCase();
  }
}
