import { AfterContentInit, Component, OnChanges, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Publication } from '../model/Publication';
import { ActivatedRoute } from "@angular/router";

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

    this.http.post('http://localhost:5200/biralodb/saveReview', body, { headers: headers })
      .subscribe(
        data => { this.reviewSaved = true },
        error => console.log(error),
        () => { setTimeout(() => { this.reviewSaved = false; }, 2000) });


  }
}
