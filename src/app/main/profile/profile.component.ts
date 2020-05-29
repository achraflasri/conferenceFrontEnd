import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

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

  constructor(private authenticationService: AuthenticationService) { }


  ngOnInit(): void {
    this.user = this.authenticationService.loadUser();
  }

}
