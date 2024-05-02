import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-publication',
  templateUrl: './new-publication.component.html',
  styleUrl: './new-publication.component.scss',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class NewPublicationComponent {

  constructor(private http: HttpClient, private router: Router) { }

  submitPublication() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    let pubName = (<HTMLInputElement>document.getElementById('publication-name')).value;
    let content = (<HTMLInputElement>document.getElementById('publication-content')).value;

    const body = new URLSearchParams();
    body.set('pubName', pubName);
    body.set('content', content);
    body.set('userEmail', sessionStorage.getItem("currentUserEmail") ?? "");
    console.log(body)

    this.http.post('http://localhost:5200/biralodb/addPublication', body, { headers: headers, withCredentials: true }).subscribe(data => { },
      error => { console.log(error) },
      () => { this.router.navigateByUrl("/myPublications") });
  }
}
