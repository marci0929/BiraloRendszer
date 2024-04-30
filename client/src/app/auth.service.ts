import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn_: number = 0;
  // 0: not logged in
  // 1: biralo logged in
  // 2: szerkeszto logged in
  // 3: szerzo logged in

  constructor(private http: HttpClient) { }

  get isLoggedIn(): number {
    return this.isLoggedIn_;
  }

  login(email: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5200/app/login', body, { headers: headers, withCredentials: true });
  }

  register(user: User) {
    const body = new URLSearchParams();
    body.set('name', user.name);
    body.set('password', user.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5200/app/register', body, { headers: headers });
  }

  logout() {
    return this.http.post('http://localhost:5200/app/logout', {}, { withCredentials: true, responseType: 'text' });
  }

  checkAuth() {
    return this.http.get<boolean>('http://localhost:5200/app/checkAuth', { withCredentials: true });
  }
}
