import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }
  isAdmin() {
    return this.authenticationService.isAdmin();
  }

}
