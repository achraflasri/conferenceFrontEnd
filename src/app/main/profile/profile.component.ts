import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'

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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  faAddressCard = faAddressCard;
  faUser = faUser;

  constructor(private authenticationService: AuthenticationService) { }


  ngOnInit(): void {
    this.user = this.authenticationService.loadUser();
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
  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

}
