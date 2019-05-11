import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public domain: String;


  constructor(private http: HttpClient){
    this.domain = "http://localhost:3000/"
  }

  authenticate(user){
    return this.http.post(`${this.domain}api/usuarios/auth`,user, {headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})}).pipe(map(res => res));
  }





}
