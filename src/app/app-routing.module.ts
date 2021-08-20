import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { ClientsComponent } from './components/clients/clients.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuard } from './guards/auth.guard';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);


const routes: Routes = [
  {path:'', component: DashboardComponent, canActivate:[AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'client/add', component: AddClientComponent, canActivate:[AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path:'client/edit/:id', component: EditClientComponent, canActivate:[AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path:'client/:id', component: ClientDetailsComponent, canActivate:[AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path:'settings', component: SettingsComponent, canActivate:[AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  // {path:'clients', component: ClientsComponent},
  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
