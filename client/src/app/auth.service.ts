import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  login(name: string, email: string, pass: string) {
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('pass', pass);
    body.set('name', name);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5200/biralo_db/login', body, { headers: headers, withCredentials: true });
  }

  register(user: User) {
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('pass', user.pass);
    body.set('name', user.name);
    console.log(user);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5200/biralo_db/register', body, { headers: headers });
  }

  logout() {
    return this.http.post('http://localhost:5200/biralo_db/logout', {}, { withCredentials: true, responseType: 'text' });
  }

  checkAuth() {
    return this.http.get<boolean>('http://localhost:5200/biralo_db/checkAuth', { withCredentials: true });
  }
}
