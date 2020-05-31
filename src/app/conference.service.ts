import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs';
import { Conferences } from './main/admin/admin-conference/Conferences';
import { ToastrService } from 'ngx-toastr';

interface Conferences1 {
  id: number;
  title: string;
  description: string;
  datedebut: Date;
  datefin: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {
  public host: string = "http://localhost:8080"
  private readonly API_URL = 'https://api.github.com/repos/angular/angular/issues';
  conference: Conferences1;


  dataChange: BehaviorSubject<Conferences[]> = new BehaviorSubject<Conferences[]>([]);
  conferencesData: Conferences[];
  // Temporarily stores data from dialogs 
  dialogData: any;

  constructor(public httpClient: HttpClient,
    public authenticationService: AuthenticationService,
    private toastrService: ToastrService) {
  }

  get data(): Conferences[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  saveConference(conf: Conferences1) {
    this.conference = conf;
    localStorage.setItem('conference', JSON.stringify(conf));
  }
  loadConference(): Conferences1 {
    return JSON.parse(localStorage.getItem('conference'));
  }


  /** CRUD METHODS */
  getAllConferences(): void {
    let headers = new HttpHeaders({ 'authorization': 'Bearer ' + this.authenticationService.jwt })
    this.httpClient.get<Conferences[]>(this.host + "/conferences", { headers: headers }).subscribe(data => {
      this.dataChange.next(data['_embedded']['conferences']);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }


  addIssue(issue: Conferences): void {
    let headers = new HttpHeaders({ 'authorization': 'Bearer ' + this.authenticationService.jwt });
    this.httpClient.post(this.host + "/conferences", issue, { headers: headers }).subscribe(data => {
      this.dialogData = issue;
      this.toastrService.success('Successfully added', '', {
        positionClass: 'toast-bottom-center',
        progressBar: true,
        progressAnimation: 'decreasing'

      });
    }),
      (err: HttpErrorResponse) => {
        this.toastrService.error('Error occurred. Details: ' + err.name + ' ' + err.message, '', {

        });
        console.log(err);
      };
  }

  updateIssue(issue: Conferences): void {
    let headers = new HttpHeaders({ 'authorization': 'Bearer ' + this.authenticationService.jwt });
    this.httpClient.put(this.host + "/conferences/" + issue.id, issue, { headers: headers }).subscribe(data => {
      this.dialogData = issue;
      this.toastrService.success('Successfully Updated', '', {
        positionClass: 'toast-bottom-center',
        progressBar: true,
        progressAnimation: 'decreasing'

      });
    }),
      (err: HttpErrorResponse) => {
        this.toastrService.error('Error occurred. Details: ' + err.name + ' ' + err.message, '', {

        });
        console.log(err);
      };
  }

  deleteIssue(id: number): void {
    let headers = new HttpHeaders({ 'authorization': 'Bearer ' + this.authenticationService.jwt });
    this.httpClient.delete(this.host + "/conferences/" + id, { headers: headers }).subscribe(data => {
      this.toastrService.success('Successfully deleted', 'title', {
        positionClass: 'toast-bottom-center',
        progressBar: true,
        progressAnimation: 'decreasing'
      });

    }, (error: HttpErrorResponse) => {
      this.toastrService.error('Error occurred. Details: ' + error.name + ' ' + error.message, '', {

      });
    });
    console.log(id);
  }

}




