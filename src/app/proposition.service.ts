import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

interface PropositionSubmissionForm {
  id?: number;
  titre?: string;
  path?: string;
  status?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PropositionService {
  public host: string = "http://localhost:8080";
  public proposition: PropositionSubmissionForm;
  public arrayOfPropositions: PropositionSubmissionForm[];


  constructor(public httpClient: HttpClient,
    public authenticationService: AuthenticationService) {
  }

  // Post submissiom
  submitProposition(prop: PropositionSubmissionForm, idConf: number, idAuthor: number): void {
    let headers = new HttpHeaders();
    headers.append('authorization', 'Bearer ' + this.authenticationService.jwt);
    headers.append('Content-Type', 'application/json');
    this.httpClient.post(this.host + "/submitProposition/" + idConf + "/" + idAuthor, prop, { headers: headers, responseType: 'text' }).subscribe(data => {
      this.proposition = prop;
      console.log(data);
    }),
      (err: HttpErrorResponse) => {
        console.log(err);
      };
  }

  // Get Proposition for an author
  getProposition(idAuthor: number): Observable<PropositionSubmissionForm[]> {
    let headers = new HttpHeaders();
    headers.append('authorization', 'Bearer ' + this.authenticationService.jwt);
    return this.httpClient.get<PropositionSubmissionForm[]>(this.host + "/cusers/" + idAuthor + "/propositions")
  }

  // Delete Proposition 
  deleteProposition(idProp: number, idAuthor: number, idConf: number) {
    let headers = new HttpHeaders();
    headers.append('authorization', 'Bearer ' + this.authenticationService.jwt);
    this.httpClient.delete(this.host + "/deleteProposition/" + idProp + "/" + idAuthor + "/" + idConf, { headers: headers, responseType: 'text' }).subscribe(data => {
      console.log(data);
    }),
      (err: HttpErrorResponse) => {
        console.log(err);
      };
  }

  //Update Proposition
  updateProposition(proposition: PropositionSubmissionForm, idProp: number) {
    let headers = new HttpHeaders();
    headers.append('authorization', 'Bearer ' + this.authenticationService.jwt);
    headers.append('Content-Type', 'application/json');
    this.httpClient.patch(this.host + "/updateProposition/" + idProp, proposition, { headers: headers, responseType: 'text' }).subscribe(data => {
      console.log(data);
    }),
      (err: HttpErrorResponse) => {
        console.log(err);
      };

  }

}
