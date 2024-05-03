import { Component } from '@angular/core';
import { AfterContentInit, OnChanges, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Publication } from '../model/Publication';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-review-publication',
  templateUrl: './review-publication.component.html',
  styleUrl: './review-publication.component.scss'
})
export class ReviewPublicationComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  publications: Publication[] = new Array<Publication>();

  ngOnInit(): void {
    this.http.get('http://localhost:5200/biralodb/getAllPublication').subscribe(data => {
      for (let pub of (data as any[])) {
        this.publications.push({ id: pub["id"], name: pub["pubName"], content: pub["content"] });
      }
    }, error => console.log(error));
  }

  reviewPublication(id: string) {
    this.router.navigate(["/viewPublication", id]);
  }
}
