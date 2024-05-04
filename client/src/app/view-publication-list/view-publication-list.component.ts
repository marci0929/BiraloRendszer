import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getUserRank } from '../app.component';
import { Publication } from '../model/Publication';

@Component({
  selector: 'app-view-publication-list',
  templateUrl: './view-publication-list.component.html',
  styleUrl: './view-publication-list.component.scss'
})
export class ViewPublicationListComponent implements OnInit {
  protected publications: [string, string][] = new Array<[string, string]>();

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    switch (getUserRank()) {
      case "szerzo":
        this.handleSzerzo();
        break;
      case "biralo":
        this.handleBiralo();
        break;
      case "szerkeszto":
        this.handleSzerkeszto();
        break;
    }
  }

  handleSzerzo() {
    this.http.get('http://localhost:5200/biralodb/getPublicationsForEmail:email',
      { params: { "email": sessionStorage.getItem("currentUserEmail") ?? "" } }).subscribe(data => {
        console.log(data);
        for (let pub of (data as any[])) {
          this.publications.push([pub["id"], pub["pubName"]]);
        }
      }, error => console.log(error));
  }

  handleSzerkeszto() {
    this.http.get('http://localhost:5200/biralodb/getAllPublication').subscribe(data => {
      for (let pub of (data as any[])) {
        this.publications.push([pub["id"], pub["pubName"]]);
      }
    }, error => console.log(error));
  }

  handleBiralo() {
    this.route
      .data
      .subscribe(data => {
        let approveState = data["approveState"] ?? "waiting";
        console.log(approveState)
        this.http.get('http://localhost:5200/biralodb/getPubsForBiralo:email:approved',
          { params: { "email": sessionStorage.getItem("currentUserEmail") ?? "", "approved": approveState as any } }).subscribe(data => {
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
      );
  }

  openPublication(pubId: string) {
    this.router.navigate(["/viewPublication", pubId]);
  }
}
