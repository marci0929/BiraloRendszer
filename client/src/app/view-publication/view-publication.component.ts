import { AfterContentInit, Component, OnChanges, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Publication } from '../model/Publication';
import { ActivatedRoute } from "@angular/router";
import { User } from '../model/User';

@Component({
  selector: 'app-view-publication',
  templateUrl: './view-publication.component.html',
  styleUrl: './view-publication.component.scss',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
})
export class ViewPublicationComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  pubName: string = ""
  pubContent: string = ""
  reviewContent: string = ""
  reviewSaved: boolean = false;
  biraloLista: User[] = new Array<User>();

  ngOnInit(): void {
    this.http.get('http://localhost:5200/biralodb/getPublicationById:id',
      { params: { "id": this.route.snapshot.paramMap.get('id') ?? "" } }).subscribe(data => {
        console.log(data);
        this.pubName = (data as any)["pubName"]
        this.pubContent = (data as any)["content"];
      }, error => console.log(error));

    this.http.get('http://localhost:5200/biralodb/reviewById:id',
      { params: { "id": this.route.snapshot.paramMap.get('id') ?? "" } }).subscribe(data => {
        console.log(data);
        this.reviewContent = (data as any)["reviewContent"];
      }, error => console.log(error));

    if (this.getUserRank() == "2") {
      this.http.get('http://localhost:5200/biralodb/getUsersByRank:rank',
        { params: { "rank": "biralo" } }).subscribe(data => {
          for (let biralo of (data as any[])) {
            this.biraloLista.push({ name: (biralo as any)["name"], pass: "", email: (biralo as any)["email"], rank: "biralo" });
          }
        }, error => console.log(error));
    }
  }

  getUserRank() {
    return sessionStorage.getItem('user_rank');
  }

  saveReview() {
    const body = new URLSearchParams();
    let reviewContent = (<HTMLInputElement>document.getElementById('review')).value;

    body.set('pubId', this.route.snapshot.paramMap.get('id') ?? "");
    body.set('reviewContent', reviewContent);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5200/biralodb/saveReview', body, { headers: headers })
      .subscribe(
        data => { this.reviewSaved = true },
        error => console.log(error),
        () => { setTimeout(() => { this.reviewSaved = false; }, 2000) });
  }

  setBiralok() {
    const body = new URLSearchParams();
    let biralo1_email = (<HTMLInputElement>document.getElementById('biralo_1')).value;
    let biralo2_email = (<HTMLInputElement>document.getElementById('biralo_2')).value;

    body.set('pubId', this.route.snapshot.paramMap.get('id') ?? "");
    body.set('biralo1_email', biralo1_email);
    body.set('biralo2_email', biralo2_email);
    body.set('biralo1_approved', "false");
    body.set('biralo2_approved', "false");

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5200/biralodb/addBiraloToPub', body, { headers: headers })
      .subscribe(
        data => { },
        error => console.log(error),
        () => { });
  }
}
