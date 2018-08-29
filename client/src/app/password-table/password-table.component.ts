import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Password } from '../api/_password';
import { ApiService } from '../api/api.service';
import { AlertService } from '../alert/alert.service';
import { DataStorageService } from '../edit-password/data-storage.service';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'password-table',
  styleUrls: ['password-table.component.css'],
  templateUrl: 'password-table.component.html',
})
export class PasswordTableComponent implements OnInit {
  displayedColumns: string[] = ['website', 'username', 'password', 'notes', 'actions'];
  dataSource = new MatTableDataSource<Password>();
  loading: Boolean;

  ngOnInit() {
    this.loading = true;
    let parent = this;

    this.apiService.findPasswords().subscribe(response => {
      parent.loading = false;
      parent.dataSource.data = response;
    }, response => {
      parent.alertService.error(response.error.message);
      parent.loading = false;
    });
  }

  constructor(
    private router: Router,
    private apiService: ApiService,
    private alertService: AlertService,
    private dataService: DataStorageService
  ) {}

  editPassword(obj: Password) {
    this.dataService.formData = obj;
    this.router.navigate(['/edit']);
  }

  deletePassword(id: string, index: any) {
    this.loading = true;
    let parent = this;

    this.apiService.deletePassword(id).subscribe(response => {
      parent.loading = false;
      parent.dataSource.data.splice(index, 1);
    }, response => {
      parent.alertService.error(response.error.message);
      parent.loading = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}