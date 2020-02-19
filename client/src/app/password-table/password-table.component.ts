import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { Password } from "../api/_password";
import { ApiService } from "../api/api.service";
import { AlertService } from "../alert/alert.service";
import { DataStorageService } from "../edit-password/data-storage.service";
import { DialogOverviewExampleDialog } from "./confirm-password.component";
import { resolve } from "q";

/**
 * @title Table with filtering
 */
@Component({
  selector: "password-table",
  styleUrls: ["password-table.component.css"],
  templateUrl: "password-table.component.html"
})
export class PasswordTableComponent implements OnInit {
  displayedColumns: string[] = [
    "website",
    "username",
    "password",
    "notes",
    "actions"
  ];
  dataSource = new MatTableDataSource<Password>();
  loading: boolean;
  confirmDelete: boolean;

  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort)
  set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator)
  set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    let parent = this;
    this.loading = true;

    this.apiService.findPasswords().subscribe(
      response => {
        parent.loading = false;
        parent.dataSource.data = response;
      },
      response => {
        parent.alertService.error(response.error.message);
        parent.loading = false;
      }
    );
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
    this.router.navigate(["/edit"]);
  }

  deletePassword(id: string, website: string, index: any): void {
    let parent = this;

    this.dialog
      .open(DialogOverviewExampleDialog, {
        width: "350px",
        data: { title: website }
      })
      .afterClosed()
      .toPromise()
      .then(result => {
        if (result) {
          parent.loading = true;
          return parent.apiService.deletePassword(id).toPromise();
        } else {
          return resolve(null);
        }
      })
      .then(response => {
        if (response) {
          parent.loading = false;
          parent.dataSource.data.splice(index, 1);
        }
      })
      .catch(response => {
        parent.alertService.error(response.error.message);
        parent.loading = false;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
