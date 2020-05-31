import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ConferenceService } from 'src/app/conference.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

interface Conferences {
  id: number;
  title: string;
  description: string;
  datedebut: Date;
  datefin: Date;
}
interface Users {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  username: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-admin-assign-conf',
  templateUrl: './admin-assign-conf.component.html',
  styleUrls: ['./admin-assign-conf.component.css']
})
export class AdminAssignConfComponent implements OnInit {
  confSelectedID: number;
  chairSelectedID: number;
  conferenceList: Conferences[];
  chairList: Users[];
  host = "http://localhost:8080/";

  form = new FormGroup(
    {
      idConf: new FormControl(null, [Validators.required]),
      idUser: new FormControl(null, [Validators.required])
    }
  );

  constructor(private httpClient: HttpClient,
    private conferenceService: ConferenceService,
    private router: Router,
    private authenticationService: AuthenticationService) {

    setTimeout(() => {
      this.httpClient.get<Conferences[]>(this.host + "conferences").subscribe(data => {
        this.conferenceList = data['_embedded']['conferences'];
      });
    }, 1);
    setTimeout(() => {
      let headers = new HttpHeaders({ 'authorization': 'Bearer ' + this.authenticationService.jwt })
      this.httpClient.get<Users[]>(this.host + "cusers", { headers: headers }).subscribe(data => {
        this.chairList = data['_embedded']['cusers'];
      });
    }, 1);

  }

  ngOnInit(): void {
  }

  get sortConferenceList() {
    return this.conferenceList;
  }
  get sortUserList() {
    return this.chairList;
  }
  onAssignConf(form) {
    let idConfe = +form.idConf;
    let idChair = +form.idUser;
    this.httpClient.post(this.host + "assignConf/" + idConfe + "/" + idChair, {}, { responseType: 'text' }).subscribe(data => {
      console.log(data)
    }),
      (err: HttpErrorResponse) => {
        console.log(err);
      };
    this.router.navigateByUrl("/main/admin/home");
  }


}
