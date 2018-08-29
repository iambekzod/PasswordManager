import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api/api.service';
import { AlertService } from '../alert/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-password',
  templateUrl: './add-password.component.html',
  styleUrls: ['./add-password.component.css']
})

export class AddPasswordComponent implements OnInit {
  addForm: FormGroup;
  loading: boolean;
  private formSubmitAttempt: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
      this.addForm = this.fb.group({
        website: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        notes: ['']
      });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.addForm.get(field).valid && this.addForm.get(field).touched) ||
      (this.addForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    let parent = this;

    if (this.addForm.valid) {
      this.loading = true;
      
      this.apiService.createPassword(this.addForm.value).subscribe(response => {
        parent.loading = false;
        parent.router.navigate(['/dashboard']);
      }, response => {
        parent.alertService.error(response.error.message);
        parent.loading = false;
      });
    }
    this.formSubmitAttempt = true;
  }
}