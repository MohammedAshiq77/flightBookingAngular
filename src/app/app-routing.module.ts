import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthadminGuard } from './Authentication/authadmin.guard';
import { AuthguardGuard } from './Authentication/authguards.guard';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: "/login", pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent , canActivate: [AuthadminGuard]},
  { path: 'register', component: RegistrationComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthguardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
