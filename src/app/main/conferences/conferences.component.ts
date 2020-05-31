import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConferenceService } from 'src/app/conference.service';
import { Conferences } from '../admin/admin-conference/Conferences';
import { Router } from '@angular/router';

interface IConference {
  title: string,
  link: string,
  caption: string,
  info: string,
  date: Date
}
interface Conferences1 {
  id: number;
  title: string;
  description: string;
  datedebut: Date;
  datefin: Date;
}

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.css']
})
export class ConferencesComponent implements OnInit {
  age: number = 15;
  users: any;
  showSpinner: boolean = true;
  panelOpenState = false;
  conferenceLinks: Conferences1[];


  constructor(private httpClient: HttpClient,
    private conferenceService: ConferenceService,
    private router: Router) {
    setTimeout(() => {
      this.httpClient.get<Conferences1[]>("http://localhost:8080/conferences").subscribe(data => {
        this.conferenceLinks = data['_embedded']['conferences'];
        console.log(this.conferenceLinks[0].title);
        console.log(this.conferenceLinks);
        console.log(this.conferenceLinks[0].datedebut);
        console.log(new Date(this.conferenceLinks[0].datedebut));
        this.showSpinner = false;
        this.conferenceLinks = this.conferenceLinks!.map(conf => {
          conf.datedebut = new Date(conf.datedebut);
          conf.datefin = new Date(conf.datefin);
          return conf;
        });

      });
    }, 1000);
    // setTimeout(() => {
    //   this.httpClient.get('https://jsonplaceholder.typicode.com/users')
    //     .subscribe(data => { this.users = data; this.showSpinner = false; })
    // }, 1000);
  }

  // getAllConferences(): void {
  //   setTimeout(() => {
  //     this.httpClient.get<Conferences[]>("http://localhost:8080/conferences").subscribe(data => {
  //       this.conferenceLinks = data['_embedded']['conferences'];
  //       console.log(this.conferenceLinks);
  //       this.showSpinner = false;
  //     },
  //       (error: HttpErrorResponse) => {
  //         console.log(error.name + ' ' + error.message);
  //       });
  //   }, 1000);

  // }

  navigateToRoute(path: string, conf: Conferences1) {
    this.router.navigateByUrl(path);
    this.conferenceService.saveConference(conf);
  }

  get sortConferenceLinks() {
    return this.conferenceLinks;
  }

  ngOnInit(): void {
    // this.getAllConferences();

  }

}
