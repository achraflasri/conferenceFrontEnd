import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  username: string;
  expiration: Date;

  constructor(private authenticationService: AuthenticationService) {
    this.expiration = authenticationService.expiration;
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  isChair() {
    return this.authenticationService.isChair();
  }
  isAuthor() {
    return this.authenticationService.isAuthor();
  }
  isReviewer() {
    return this.authenticationService.isReviewer();
  }
  isAutheticated() {
    this.username = this.authenticationService.name;
    return this.authenticationService.isAuthenticated();
  }

  ngOnInit(): void {
    this.authenticationService.loadToken();
  }

  logOut() {
    this.authenticationService.logOut();
  }
}
