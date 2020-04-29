import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService,
              private router:Router) { }

  ngOnInit() {
  }

  onLogin(data){
    console.log(data);
    this.authenticationService.login(data)
      .subscribe(resp=>{
        let jwt = resp.headers.get("Authorization"); // we get the jwt token into jwt variable
        this.authenticationService.saveToken(jwt); // we save it in the local storage using the saveToken function
        this.router.navigateByUrl("/main"); // after we login in we go back to http:/
      },error => {
        console.log(error)
      })
  }

  isAdmin(){
    return this.authenticationService.isAdmin();
  }


}
