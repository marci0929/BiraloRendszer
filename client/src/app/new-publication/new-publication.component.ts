import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-new-publication',
  templateUrl: './new-publication.component.html',
  styleUrl: './new-publication.component.scss'
})
export class NewPublicationComponent {

  constructor(private http: HttpClient) { }

  submitPublication() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    let pubName = (<HTMLInputElement>document.getElementById('publication-name')).value;
    let content = (<HTMLInputElement>document.getElementById('publication-content')).value;

    this.http.get('http://localhost:5200/biralodb/countDocuments', { params: { "collection": "Publications" } }).subscribe({
      next: (data) => {
        let numDocs = data as number;
        const body = new URLSearchParams();
        body.set('id', (numDocs + 1).toString());
        body.set('name', pubName);
        body.set('content', content);


        return this.http.post('http://localhost:5200/biralodb/addPublication', body, { headers: headers, withCredentials: true });
      }
    }
    )

  }
}
