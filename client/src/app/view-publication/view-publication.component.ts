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

  ngOnInit(): void {
    this.http.get('http://localhost:5200/biralodb/getPublicationById:id',
      { params: { "id": this.route.snapshot.paramMap.get('id') ?? "" } }).subscribe(data => {
        console.log(data);
        this.pubName = (data as any)["pubName"]
        this.pubContent = (data as any)["content"];
      }, error => console.log(error));
  }
}
