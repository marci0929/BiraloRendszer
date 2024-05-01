import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { NewPublicationComponent } from './new-publication/new-publication.component';
import { MyPublicationsComponent } from './my-publications/my-publications.component';
import { AddBiraloComponent } from './add-biralo/add-biralo.component';
import { SelectPublicationComponent } from './select-publication/select-publication.component';
import { ReviewPublicationComponent } from './review-publication/review-publication.component';
import { WaitingApprovalComponent } from './waiting-approval/waiting-approval.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogoutComponent,
    NewPublicationComponent,
    MyPublicationsComponent,
    AddBiraloComponent,
    SelectPublicationComponent,
    ReviewPublicationComponent,
    WaitingApprovalComponent
  ],
  imports: [
    RegisterComponent,
    LoginComponent,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
