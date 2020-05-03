import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: String;
  constructor(private authenticationService: AuthenticationService) {

  }

  ngOnInit(): void {
  }

  isAuthenticated() {
    this.username = this.authenticationService.name;
    return this.authenticationService.isAuthenticated();
  }

  logOut() {
    this.authenticationService.logOut();
  }

}
