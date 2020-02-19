import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private alertService: AlertService,
    private apiService: ApiService) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirm_password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  checkPasswords(fb: FormGroup) { // here we have the 'passwords' group
    let pass = fb.controls.password.value;
    let confirmPass = fb.controls.confirm_password.value;

    return pass === confirmPass ? null : { notSame: true }     
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
      
      this.apiService.register(this.form.value).subscribe(() => {
        parent.loading = false;
        parent.router.navigate(['/login']);
      }, response => {
        parent.alertService.error(response.error.message);
        parent.loading = false;
      });
    }
    this.formSubmitAttempt = true;
  }
}
