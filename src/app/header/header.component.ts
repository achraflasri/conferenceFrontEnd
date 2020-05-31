import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: String;
  faCoffee = faCoffee;
  faBars = faBars;
  constructor(private authenticationService: AuthenticationService) {

  }

  ngOnInit(): void {
  }

  isAuthenticated() {
    this.username = this.authenticationService.name;
    return this.authenticationService.isAuthenticated();
  }
  isAdmin() {
    return this.authenticationService.isAdmin() || this.authenticationService.isAuthenticated();
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

  logOut() {
    this.authenticationService.logOut();
  }

}
