import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LoginActivateGuard } from './guards/login-activate.guard'

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginActivateGuard], }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LoginActivateGuard]
})
export class AuthenticationRoutingModule { }
