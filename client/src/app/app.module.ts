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
import { ViewPublicationComponent } from './view-publication/view-publication.component';
import { ViewPublicationListComponent } from './view-publication-list/view-publication-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogoutComponent,
    ViewPublicationListComponent,
  ],
  imports: [
    ViewPublicationComponent,
    NewPublicationComponent,
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
