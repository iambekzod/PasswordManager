import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataStorageService } from './data-storage.service';
import { ApiService } from '../api/api.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
  editForm: FormGroup;
  payload: any;
  loading: boolean;
  private formSubmitAttempt: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertService,
    private dataService: DataStorageService) {}

  isFieldInvalid(field: string) {
    return (
      (!this.editForm.get(field).valid && this.editForm.get(field).touched) ||
      (this.editForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      notes: ['']
    });

    if (this.dataService.formData === undefined) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    this.editForm.setValue({
      username: this.dataService.formData.username,
      password: this.dataService.formData.password,
      notes: this.dataService.formData.notes
    });
  }

  onSubmit() {
    let parent = this;

    if (this.editForm.valid) {
      this.payload = {
        website: this.dataService.formData.website
      };

      if (this.dataService.formData.username !== this.editForm.value.username) {
        this.payload.username = this.editForm.value.username;
      }
      if (this.dataService.formData.password !== this.editForm.value.password) {
        this.payload.password = this.editForm.value.password;
      }
      if (this.dataService.formData.notes !== this.editForm.value.notes) {
        this.payload.notes = this.editForm.value.notes;
      }

      if (this.payload.username !== undefined || this.payload.password !== undefined || this.payload.notes !== undefined) {
        this.apiService.updatePassword(this.dataService.formData._id, this.payload).subscribe(() => {
          parent.loading = false;
          parent.router.navigate(['/dashboard']);
        }, response => {
          parent.alertService.error(response.error.message);
          parent.loading = false;
        });
      } else {
        parent.router.navigate(['/dashboard']);
      }
    }
    this.formSubmitAttempt = true;
  }

}
