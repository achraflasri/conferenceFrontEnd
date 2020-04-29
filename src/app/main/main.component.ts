import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  username:string;
  expiration:Date;

  constructor(private authentificationService:AuthenticationService) {
    this.expiration = authentificationService.expiration;
  }

  isAdmin(){
    return this.authentificationService.isAdmin();
  }
  isUser(){
    return this.authentificationService.isUser();
  }
  isAutheticated(){
    this.username = this.authentificationService.name;
    return this.authentificationService.isAuthenticated();
  }

  ngOnInit(): void {
    this.authentificationService.loadToken();
  }

  logOut() {
    this.authentificationService.logOut();
  }
}
