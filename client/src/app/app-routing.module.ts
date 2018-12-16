import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/guard/auth.guard';
import { RoleGuard } from './auth/guard/role.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddPasswordComponent } from './add-password/add-password.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { InvalidPathComponent } from './invalid-path/invalid-path.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [RoleGuard] },
  { path: 'login', component: LoginComponent, canActivate: [RoleGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [RoleGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddPasswordComponent, canActivate: [AuthGuard] },
  { path: 'edit', component: EditPasswordComponent, canActivate: [AuthGuard] },
  { path: '**', component: InvalidPathComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
