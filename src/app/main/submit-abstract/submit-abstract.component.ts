import { Component, OnInit } from '@angular/core';
import { ConferenceService } from 'src/app/conference.service';
import { AuthenticationService } from 'src/app/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropositionService } from 'src/app/proposition.service';
import { Router } from '@angular/router';

interface Conferences1 {
  id: number;
  title: string;
  description: string;
  datedebut: Date;
  datefin: Date;
}
interface PropositionSubmissionForm {
  titre: string;
  path: string;
  status: boolean;
}
interface UserSubmissionForm {
  first_name: string;
  last_name: string;
  phone: string;
}

@Component({
  selector: 'app-submit-abstract',
  templateUrl: './submit-abstract.component.html',
  styleUrls: ['./submit-abstract.component.css']
})
export class SubmitAbstractComponent implements OnInit {
  form = new FormGroup(
    {
      nom: new FormControl('', Validators.minLength(2)),
      prenom: new FormControl('', Validators.minLength(2)),
      email: new FormControl('', Validators.minLength(7)),
      tel: new FormControl('', Validators.minLength(5)),
      sessionTitle: new FormControl('', Validators.minLength(5))
    }
  );

  conference: Conferences1;
  proposition: PropositionSubmissionForm = {} as any;
  user: UserSubmissionForm = {} as any;

  constructor(private conferenceService: ConferenceService,
    private authenticationService: AuthenticationService,
    private propositionService: PropositionService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.conference = this.conferenceService.loadConference();
  }

  isAuthor() {
    return this.authenticationService.isAuthor();
  }

  onSubmitProposition(form) {
    if (this.isAuthor()) {
      console.log(form);
      this.proposition.titre = form.sessionTitle;
      console.log(this.proposition);
      console.log(this.conference.id);
      console.log(this.authenticationService.getUserId());
      this.propositionService.submitProposition(this.proposition, this.conference.id, this.authenticationService.getUserId());
      setTimeout(() => {
        this.router.navigateByUrl("/main/author");
      }, 5000)


      // Call the spring function so we can link the proposition submission to the author and conference
      // Redirect to author page so he can view that his proposition is pending 
    } else {
      console.log(form);
      this.proposition.titre = form.sessionTitle;
      this.user.first_name = form.nom;
      this.user.last_name = form.prenom;
      this.user.phone = form.tel;
      localStorage.setItem('userForm', JSON.stringify(this.user));
      localStorage.setItem('propositionForm', JSON.stringify(this.proposition));
      this.router.navigateByUrl("/access/register");

      /* 
      1.Redirect to register page so the author can create an account
      2.Combine the info from the register form and the presenter info
      3.Create the author with spring function
      4.Call the spring function so we can link the proposition submission to the author and conference
      5.Redirect to author page

      */
    }

  }

}
