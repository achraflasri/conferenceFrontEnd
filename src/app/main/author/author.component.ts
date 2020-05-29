import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { PropositionService } from 'src/app/proposition.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ConferenceService } from 'src/app/conference.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePropositionComponent } from './dialogs/update-proposition/update-proposition.component';

interface Proposition {
  id?: number;
  titre?: string;
  path?: string;
  status?: boolean;
}

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private propositionService: PropositionService,
    private conferenceService: ConferenceService,
    private router: Router,
    public dialog: MatDialog) {

  }

  propositions: Proposition[];

  ngOnInit(): void {
    this.getPropositions();
  }

  isAuthor() {
    return this.authenticationService.isAuthor();
  }

  getPropositions() {
    console.log(this.propositionService.getProposition(this.authenticationService.loadUser().id));
    this.propositionService.getProposition(this.authenticationService.loadUser().id).subscribe(data => {
      this.propositions = data['_embedded']['propositions'];
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }
  onDelete(idProp: number) {
    console.log(idProp);
    this.propositionService.deleteProposition(idProp, this.authenticationService.loadUser().id, this.conferenceService.loadConference().id);
    setTimeout(() => {
      window.location.reload();
    }, 2000)
  }
  onUpdate(proposition: Proposition, idProp: number) {
    const dialogRef = this.dialog.open(UpdatePropositionComponent, {
      data: { proposition, idProp }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      window.location.reload();
    });
  }



}
