import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public authToken: any;
  public domain: String;

  constructor(private http: HttpClient){
    this.domain = "http://localhost:3000/"
  }

  authenticate(user){
    return this.http.post(`${this.domain}api/usuarios/auth`,user, {headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})}).pipe(map(res => res));
  }

  
  storeUserData(token, nombresdata, apellidosdata, fotodata){
    localStorage.setItem('id_token',token);
    localStorage.setItem('cliente', JSON.stringify( { nombres: nombresdata,apellidos : apellidosdata, foto: fotodata }));
    this.authToken = token;
  }

  loadToken(){
    this.authToken = localStorage.getItem('id_token');
  }
  
  loggedIn(){
    if (localStorage.getItem("id_token") === null) {
      return false;
    }else{
      return true;
    }  
  }


  logout(){
    this.authToken = null;
    localStorage.clear();
  }
  
}