import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 0: not logged in
  // 1: biralo logged in
  // 2: szerkeszto logged in
  // 3: szerzo logged in

  constructor(private http: HttpClient) { }


  login(email: string, pass: string) {
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', pass);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5200/biralodb/login', body, { headers: headers, withCredentials: true });
  }

  register(user: User) {
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('pass', user.pass);
    body.set('name', user.name);
    body.set('rank', user.rank);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5200/biralodb/register', body, { headers: headers });
  }

  logout() {
    return this.http.post('http://localhost:5200/biralodb/logout', {}, { withCredentials: true, responseType: 'text' });
  }

  checkAuth() {
    return this.http.get<boolean>('http://localhost:5200/biralodb/checkAuth', { withCredentials: true });
  }
}
