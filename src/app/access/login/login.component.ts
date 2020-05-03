import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  role: boolean;

  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  onLogin(data) {
    console.log(data);
    this.authenticationService.login(data)
      .subscribe(resp => {
        let jwt = resp.headers.get("Authorization"); // we get the jwt token into jwt variable
        this.authenticationService.saveToken(jwt); // we save it in the local storage using the saveToken function
        this.role = true;
        // this.router.navigateByUrl("/main");
        switch (this.role) {
          case this.isAdmin(): {
            this.router.navigateByUrl("/main/admin");
            break;
          }
          case this.isReviewer(): {
            this.router.navigateByUrl("/main/reviewer");
            break;
          }
          case this.isAuthor(): {
            this.router.navigateByUrl("/main/author");
            break;
          }
          case this.isChair(): {
            this.router.navigateByUrl("/main/chair");
            break;
          }
          default: {
            this.router.navigateByUrl("/main");
            break;
          }
        }
      }, error => {
        console.log(error)
      })
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

}
