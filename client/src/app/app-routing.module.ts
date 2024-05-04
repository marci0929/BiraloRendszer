import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service/auth.guard';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { NewPublicationComponent } from './new-publication/new-publication.component';
import { ViewPublicationComponent } from './view-publication/view-publication.component';
import { ViewPublicationListComponent } from './view-publication-list/view-publication-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'viewAccepted', component: ViewPublicationListComponent, data: { approveState: "accept" } },
  { path: 'viewRejected', component: ViewPublicationListComponent, data: { approveState: "reject" } },
  { path: 'viewPublication/:id', component: ViewPublicationComponent },
  { path: 'viewPublicationList', component: ViewPublicationListComponent },
  { path: 'newPublication', component: NewPublicationComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
