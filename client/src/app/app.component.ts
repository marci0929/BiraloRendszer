import { Component, SimpleChanges } from '@angular/core';
import { AuthService } from './service/auth.service';

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

  getUserRank() {
    if (sessionStorage.getItem('user_rank') == null) {
      sessionStorage.setItem('user_rank', '');
    }
    return sessionStorage.getItem('user_rank');
  }

}

export function getUserRank() {
  if (sessionStorage.getItem('user_rank') == null) {
    sessionStorage.setItem('user_rank', '');
  }
  return sessionStorage.getItem('user_rank');
}
