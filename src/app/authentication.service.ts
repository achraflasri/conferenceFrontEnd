import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  host2: string = "http://localhost:8080"
  jwt: string;
  username: string;
  name: string;
  expiration: Date;
  roles: string[];
  user: User;


  constructor(private http: HttpClient) {
  }

  login(data) {
    return this.http.post(this.host2 + "/login", data, { observe: 'response' });
  }
  saveToken(jwt: string) {
    localStorage.setItem("token", jwt)
    this.jwt = jwt;
    this.parseJWT();

  }
  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  loadUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  getUser(username: string) {
    if (this.isAuthenticated()) {
      this.http.get<User>(this.host2 + "/getUser/" + username).subscribe(data => {
        this.user = data;
        this.saveUser(this.user);
        console.log(data);
      },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        });
    }

  }

  getUserId(): number {
    return this.user.id;
  }


  parseJWT() {
    // On recupere les roles et le username apartir du jwt
    const jwtHelperService = new JwtHelperService();
    const jwtObject = jwtHelperService.decodeToken(this.jwt); // on transfere les info dans un object
    this.username = jwtObject?.sub;
    this.name = jwtObject?.sub;
    this.roles = jwtObject?.roles;
    this.expiration = jwtHelperService.getTokenExpirationDate(this.jwt);
    this.getUser(jwtObject?.sub);
  }

  isAdmin() {
    return this.roles && this.roles.indexOf('ADMIN') >= 0;
  }
  isChair() {
    return this.roles && this.roles.indexOf('CHAIR') >= 0;
  }
  isAuthor() {
    return this.roles && this.roles.indexOf('AUTHOR') >= 0;
  }
  isReviewer() {
    return this.roles && this.roles.indexOf('REVIEWER') >= 0;
  }
  isAuthenticated() {
    return this.roles && (this.isAdmin() || this.isChair() || this.isReviewer() || this.isAuthor());
  }
  loadToken() {
    this.jwt = localStorage.getItem('token');
    this.parseJWT();
  }
  logOut() {
    localStorage.removeItem('token');
    this.initParams();
  }
  initParams() {
    this.jwt = undefined;
    this.username = undefined;
    this.roles = undefined;
  }
}
