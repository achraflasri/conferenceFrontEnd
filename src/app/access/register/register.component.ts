import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { PropositionService } from 'src/app/proposition.service';
import { ConferenceService } from 'src/app/conference.service';

interface UserForm {
  first_name: string;
  last_name: string;
  phone: string;
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;
  role: string;
}
interface UserSubmissionForm {
  first_name: string;
  last_name: string;
  phone: string;
}
interface UserLoginForm {
  username: string;
  password: string;
}
interface Conferences {
  id: number;
  title: string;
  description: string;
  datedebut: Date;
  datefin: Date;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: UserForm = {} as any;
  userLogin: UserLoginForm = {} as any;
  presenterFrom: UserSubmissionForm;
  conference: Conferences;

  form = new FormGroup(
    {
      username: new FormControl('', Validators.minLength(2)),
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.minLength(2)),
      confirmedPassword: new FormControl('', Validators.minLength(2))
    },
    this.passwordMatchValidator

  );
  usernameErrorMatcher = {
    isErrorState: (control: FormControl): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.form.invalid;
      return controlInvalid || formInvalid;
    }
  }
  emailErrorMatcher = {
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
  confirmErrorMatcher = {
    isErrorState: (control: FormControl): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.form.get('password').touched && this.form.invalid;
      return controlInvalid || formInvalid;
    }
  }
  getErrorMessage(controlName: string) {
    if (this.form.controls[controlName].hasError('email')) {
      return 'Please enter a valid email'
    }
    else if (this.form.controls[controlName].hasError('required')) {
      return controlName + ' is Required'
    }
    return 'Password must match'
  }
  passwordMatchValidator(g: FormGroup) {
    const password = g.get('password').value;
    const confirmedPassword = g.get('confirmedPassword').value
    return password === confirmedPassword ? null : { mismatch: true };
  }

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService,
    private propositionService: PropositionService,
    private conferenceService: ConferenceService) { }

  onRegister(form) {
    console.log(form);
    this.presenterFrom = JSON.parse(localStorage.getItem('userForm'));
    this.user.username = form.username;
    this.userLogin.username = form.username;
    this.user.email = form.email;
    this.user.password = form.password;
    this.userLogin.password = form.password;
    this.user.confirmedPassword = form.confirmedPassword;
    this.user.first_name = this.presenterFrom.first_name;
    this.user.last_name = this.presenterFrom.last_name;
    this.user.phone = this.presenterFrom.phone;
    this.user.role = "AUTHOR";
    this.userService.createAuthorAccount(this.user);
    setTimeout(() => {
      this.authenticationService.getUser(this.user.username);
    }, 1000)
    setTimeout(() => {
      this.propositionService.submitProposition(JSON.parse(localStorage.getItem('propositionForm')), this.conference.id, this.authenticationService.loadUser().id);
    }, 2000);
    setTimeout(() => {
      this.onLogin(this.userLogin);
    }, 3000)

  }

  ngOnInit(): void {
    this.conference = this.conferenceService.loadConference();
  }
  onLogin(form) {
    console.log(form);
    this.authenticationService.login(form)
      .subscribe(resp => {
        let jwt = resp.headers.get("Authorization"); // we get the jwt token into jwt variable
        this.authenticationService.saveToken(jwt); // we save it in the local storage using the saveToken function
        this.router.navigateByUrl("/main/author");
      }, error => {
        console.log(error)
      })
  }

  isAuthor() {
    return this.authenticationService.isAuthor();
  }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

}
