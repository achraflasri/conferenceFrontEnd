import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  host2:string="http://localhost:8080"
  jwt:string ;
  username:string ;
  name:string;
  expiration:Date;
  roles:string[] ;

  constructor(private http:HttpClient) { }

  login(data){
    return this.http.post(this.host2+"/login",data,{observe:'response'});
  }
  saveToken(jwt: string) {
    localStorage.setItem("token",jwt)
    this.jwt=jwt;
    this.parseJWT();
  }

  parseJWT() {
    // On recupere les roles et le username apartir du jwt
    const jwtHelperService = new JwtHelperService();
    const jwtObject = jwtHelperService.decodeToken(this.jwt); // on transfere les info dans un object
    this.username = jwtObject.sub;
    this.name = jwtObject.sub;
    this.roles =jwtObject.roles;
    this.expiration = jwtHelperService.getTokenExpirationDate(this.jwt);
    console.log(jwtObject);
  }

  isAdmin(){
    return this.roles.indexOf('ADMIN')>=0;
  }
  isUser(){
    return this.roles.indexOf('USER')>=0;
  }
  isAuthenticated(){
    return this.roles && (this.isAdmin() || this.isUser());
  }
  loadToken() {
    this.jwt = localStorage.getItem('token');
    this.parseJWT();
  }
  logOut() {
    localStorage.removeItem('token');
    this.initParams();
  }
  initParams(){
    this.jwt = undefined;
    this.username=undefined;
    this.roles = undefined;
  }
}
