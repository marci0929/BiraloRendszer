import { Component } from '@angular/core';
import { OnChanges, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Publication } from '../model/Publication';

@Component({
  selector: 'app-view-accepted',
  templateUrl: './view-accepted.component.html',
  styleUrl: './view-accepted.component.scss'
})
export class ViewAcceptedComponent implements OnInit {


  protected publications: [string, string][] = new Array<[string, string]>();

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get('http://localhost:5200/biralodb/getPubsForBiralo:email:approved',
      { params: { "email": sessionStorage.getItem("currentUserEmail") ?? "", "approved": "true" } }).subscribe(data => {
        for (let pub of (data as any[])) {
          this.http.get('http://localhost:5200/biralodb/getPublicationById:id',
            { params: { "id": pub["pubId"] ?? "" } }).subscribe(publication => {
              let pubId = (publication as any)["id"]
              let pubName = (publication as any)["pubName"];
              this.publications.push([pubId, pubName]);
            }, error => console.log(error));

        }
      }, error => console.log(error));
  }

  openPublication(pubId: string) {
    this.router.navigate(["/viewPublication", pubId]);
  }
}
