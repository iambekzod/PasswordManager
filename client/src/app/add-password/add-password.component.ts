import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api/api.service';
import { AlertService } from '../alert/alert.service';
import { Router } from '@angular/router';
import { Password } from '../api/_password';

@Component({
  selector: 'app-add-password',
  templateUrl: './add-password.component.html',
  styleUrls: ['./add-password.component.css']
})

export class AddPasswordComponent implements OnInit {
  passwords: Password[];

  form: FormGroup;
  loading: Boolean;
  private formSubmitAttempt: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
      this.form = this.fb.group({
        website: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        notes: ['']
      });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    let parent = this;

    if (this.form.valid) {
      parent.loading = true;
      
      this.apiService.findPasswords().subscribe(response => {
        parent.loading = false;
        parent.passwords = response;
        parent.router.navigate(['/dashboard']);
      }, response => {
        parent.alertService.error(response.error.error);
        parent.loading = false;
      });
    }
    this.formSubmitAttempt = true;
  }
}