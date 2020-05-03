import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../authentication.service";
import { Router } from "@angular/router";
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup(
    {
      username: new FormControl('', Validators.minLength(2)),
      password: new FormControl('', Validators.minLength(2))
    }
  );
  usernameErrorMatcher = {
    isErrorState: (control: FormControl): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.form.invalid;
      return controlInvalid || formInvalid;
    }
  }
  passwordErrorMatcher = {
    isErrorState: (control: FormControl): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.form.invalid;
      return controlInvalid || formInvalid;
    }
  }


  getErrorMessage(controlName: string) {
    if (this.form.controls[controlName].hasError('minlength')) {
      return 'Must be at least 2 characters'
    }
    else if (this.form.controls[controlName].hasError('required')) {
      return controlName + ' is Required'
    }

  }
  role: boolean;

  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  onLogin(form) {
    console.log(form);
    this.authenticationService.login(form)
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
