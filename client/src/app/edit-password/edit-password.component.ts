import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataStorageService } from './data-storage.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
  editForm: FormGroup;
  loading: boolean;
  private formSubmitAttempt: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
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

  sendHome() {
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {

    if (this.editForm.valid) {
      //parent.loading = true;
      
      // this.apiService.findPasswords().subscribe(response => {
      //   parent.loading = false;
      //   parent.passwords = response;
      //   parent.router.navigate(['/dashboard']);
      // }, response => {
      //   parent.alertService.error(response.error.message);
      //   parent.loading = false;
      // });
    }
    this.formSubmitAttempt = true;
  }

}
