import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from "@angular/material/icon";
import { MatInputModule, MatFormFieldModule, MatTableModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPasswordComponent } from './add-password/add-password.component';
import { PasswordTableComponent } from './password-table/password-table.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { ApiService } from './api/api.service';
import { PasswordDataService } from './api/password-data.service';

@NgModule({
  declarations: [
    AppComponent,
    AddPasswordComponent,
    PasswordTableComponent,
    EditPasswordComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [AuthGuard, AuthService, ApiService, PasswordDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
