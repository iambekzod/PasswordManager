import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Password } from '../api/_password';
import { ApiService } from '../api/api.service';
import { AlertService } from '../alert/alert.service';
import { DataStorageService } from '../edit-password/data-storage.service';
import { DialogOverviewExampleDialog } from './confirm-password.component';
import { resolve } from 'q';

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
  loading: boolean;
  confirmDelete: boolean;

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
    private dataService: DataStorageService,
    public dialog: MatDialog
  ) {}

  editPassword(obj: Password) {
    this.dataService.formData = obj;
    this.router.navigate(['/edit']);
  }

  deletePassword(id: string, website: string, index: any): void {
    let parent = this;

    this.dialog.open(DialogOverviewExampleDialog, {
      width: '350px',
      data: {title: website}
    }).afterClosed().toPromise().then(result => {

      if (result) {
        parent.loading = true;
        return parent.apiService.deletePassword(id).toPromise();
      } else {
        return resolve(null);
      }
    }).then(response => {
      if (response) {
        parent.loading = false;
        parent.dataSource.data.splice(index, 1);
      }
    }).catch(response => {
      parent.alertService.error(response.error.message);
      parent.loading = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}