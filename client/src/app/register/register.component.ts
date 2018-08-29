import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AlertService } from '../alert/alert.service';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  loading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private apiService: ApiService) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
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
      
      this.apiService.register(this.form.value).subscribe(response => {
        parent.loading = false;
        parent.authService.doSignIn(response.token);
        parent.router.navigate(['/dashboard']);
      }, response => {
        parent.alertService.error(response.error.message);
        parent.loading = false;
      });
    }
    this.formSubmitAttempt = true;
  }
}