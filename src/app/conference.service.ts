import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {
  public host: string = "http://localhost:8080"

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  getAllConferences() {
    let headers = new HttpHeaders({ 'authorization': 'Bearer ' + this.authenticationService.jwt })
    return this.http.get(this.host + "/conferences", { headers: headers })
  }
}
