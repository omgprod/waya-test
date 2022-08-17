import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AccountComponent } from './components/account/account.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import {AuthGuard} from "./shared/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'se-connecter', pathMatch: 'full' },
  { path: 'se-connecter', component: LoginComponent },
  { path: 'nouveau-compte', component: RegisterComponent },
  { path: 'mon-compte', component: AccountComponent, canActivate: [AuthGuard] },
  { path: '**', component: PagenotfoundComponent },
  //{ path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
