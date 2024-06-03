import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, ) { }

  login(email: string, password: string): Observable<any> {

    const credentials = btoa(`${email}:${password}`);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`
      })
    };

    return this.http.post(`${AUTH_API}/login`, {}, httpOptions);
  }

  register(username: string, email: string, password: string) {
    const data = { username, email, password };
    return this.http.post<any>(`${AUTH_API}/register`, data);
  }
}
