import { Component, OnChanges, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Publication } from '../model/Publication';

@Component({
  selector: 'app-my-publications',
  templateUrl: './my-publications.component.html',
  styleUrl: './my-publications.component.scss',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
})
export class MyPublicationsComponent implements OnInit {

  protected publications: [string, number][] = new Array<[string, number]>();

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get('http://localhost:5200/biralodb/getPublicationsForEmail:email',
      { params: { "email": sessionStorage.getItem("currentUserEmail") ?? "" } }).subscribe(data => {
        console.log(data);
        for (let pub of (data as any[])) {
          this.publications.push([pub["id"], pub["pubName"]]);
        }
      }, error => console.log(error));
  }

  openPublication(pubId: string) {
    this.router.navigate(["/viewPublication", pubId]);
  }

}
