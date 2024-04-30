import { Component, SimpleChanges } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Bíráló';
  pagesToDisplay: number = 0;

  constructor(public authService: AuthService) { }

  ngOnChanges(changes: SimpleChanges): void {

  }
}
