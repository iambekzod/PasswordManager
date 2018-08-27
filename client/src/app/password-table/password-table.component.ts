import {Component} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Password } from '../api/_password';
import { ApiService } from '../api/api.service';
import { AlertService } from '../alert/alert.service';

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
  dataSource = new MatTableDataSource<Password>();
  loading: Boolean;

  ngOnInit() {
    this.test();
  }

  constructor(
    private router: Router,
    private apiService: ApiService,
    private alertService: AlertService
  ) {}

  test() {
    this.loading = true;
    let parent = this;

    this.apiService.findPasswords().subscribe(response => {
      parent.loading = false;
      parent.dataSource.data = response;
      console.log(parent.dataSource.data);
    }, response => {
      parent.alertService.error(response.error.error);
      parent.loading = false;
    });
  }

  editPassword(id: string) {
    this.router.navigate(['/edit', id])
  }

  deletePassword(id: string) {
    // this.router.navigate(['/edit', item.id])
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
