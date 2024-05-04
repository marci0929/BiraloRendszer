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
  hozzarendeltBiralok: [string, string][] = new Array<[string, string]>();

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

    if (this.getUserRank() == "szerkeszto") {
      this.http.get('http://localhost:5200/biralodb/getUsersByRank:rank',
        { params: { "rank": "biralo" } }).subscribe(data => {
          for (let biralo of (data as any[])) {
            this.biraloLista.push({ name: (biralo as any)["name"], pass: "", email: (biralo as any)["email"], rank: "biralo" });
          }
        }, error => console.log(error));
    }

    if (this.getUserRank() != "biralo") {
      this.http.get('http://localhost:5200/biralodb/getBiralokForPub:pubId',
        { params: { "pubId": this.route.snapshot.paramMap.get('id') ?? "" } }).subscribe(data => {
          for (let biralo of (data as any[])) {
            this.http.get('http://localhost:5200/biralodb/getUserByEmail:email',
              { params: { "email": biralo["biralo_email"] } }).subscribe(biro => {
                if (biro != undefined) {
                  let biroRecord: [string, string] = [(biro as any)["name"], ((biralo as any)["biralo_approved"] as boolean) ? "Elfogadva" : "Elutasítva"];
                  if (biralo["biralo_num"] == 1) {
                    this.hozzarendeltBiralok.unshift(biroRecord);
                  } else {
                    this.hozzarendeltBiralok.push(biroRecord);
                  }
                }
              }, error => console.log(error));
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

  setBiralo1() {
    this.setBiralo((<HTMLInputElement>document.getElementById('biralo_1')).value, "1");
  }

  setBiralo2() {
    this.setBiralo((<HTMLInputElement>document.getElementById('biralo_2')).value, "2");
  }

  setBiralo(biralo_email: string, biralo_num: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('pubId', this.route.snapshot.paramMap.get('id') ?? "");
    body.set('biralo_num', biralo_num);
    body.set('biralo_email', biralo_email);
    body.set('biralo_approved', "false");

    return this.http.post('http://localhost:5200/biralodb/addBiraloToPub', body, { headers: headers })
      .subscribe(
        data => { },
        error => console.log(error),
        () => { });
  }

  acceptReview() {
    this.http.get('http://localhost:5200/biralodb/acceptReview:pubId:email',
      { params: { "pubId": this.route.snapshot.paramMap.get('id') ?? "", "email": sessionStorage.getItem("currentUserEmail") ?? "" } })
      .subscribe(data => {
        this.router.navigateByUrl("/waitingApproval");
      }, error => console.log(error));
  }
}
