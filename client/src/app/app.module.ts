import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { MatDialogModule } from '@angular/material';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPasswordComponent } from './add-password/add-password.component';
import { PasswordTableComponent } from './password-table/password-table.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { RoleGuard } from './auth/guard/role.guard';
import { AuthService } from './auth/auth.service';
import { ApiService } from './api/api.service';
import { AlertService } from './alert/alert.service';
import { AlertComponent } from './alert/alert.component';
import { ErrorInterceptor } from './auth/errorInterceptor';
import { HomeComponent } from './home/home.component';
import { SessionService } from './auth/session.service';
import { DataStorageService } from './edit-password/data-storage.service';
import { DialogOverviewExampleDialog } from './password-table/confirm-password.component';
import { RegisterComponent } from './register/register.component';
import { InvalidPathComponent } from './invalid-path/invalid-path.component';


@NgModule({
  declarations: [
    AppComponent,
    AddPasswordComponent,
    PasswordTableComponent,
    EditPasswordComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
    AlertComponent,
    HomeComponent,
    DialogOverviewExampleDialog,
    RegisterComponent,
    InvalidPathComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NgbModule.forRoot()
  ],
  entryComponents: [DialogOverviewExampleDialog],
  providers: [SessionService, RoleGuard, AuthGuard, AuthService, ApiService, AlertService, DataStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
