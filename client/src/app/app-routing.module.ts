import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service/auth.guard';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { WaitingApprovalComponent } from './waiting-approval/waiting-approval.component';
import { ReviewPublicationComponent } from './review-publication/review-publication.component';
import { NewPublicationComponent } from './new-publication/new-publication.component';
import { MyPublicationsComponent } from './my-publications/my-publications.component';
import { ViewPublicationComponent } from './view-publication/view-publication.component';
import { ViewAcceptedComponent } from './view-accepted/view-accepted.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'waitingApproval', component: WaitingApprovalComponent },
  { path: 'viewAccepted', component: ViewAcceptedComponent },
  { path: 'viewPublication/:id', component: ViewPublicationComponent },
  { path: 'reviewPublication', component: ReviewPublicationComponent },
  { path: 'newPublication', component: NewPublicationComponent },
  { path: 'myPublications', component: MyPublicationsComponent },
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
