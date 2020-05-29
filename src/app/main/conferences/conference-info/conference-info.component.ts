import { Component, OnInit } from '@angular/core';
import { ConferenceService } from 'src/app/conference.service';

interface Conferences1 {
  id: number;
  title: string;
  description: string;
  datedebut: Date;
  datefin: Date;
}

@Component({
  selector: 'app-conference-info',
  templateUrl: './conference-info.component.html',
  styleUrls: ['./conference-info.component.css']
})
export class ConferenceInfoComponent implements OnInit {
  conference: Conferences1;

  constructor(private conferenceService: ConferenceService) { }

  ngOnInit(): void {
    this.conference = this.conferenceService.conference
  }

}
