import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const BASE_URL = 'http://localhost:8080/rest';

@Injectable({
  providedIn: 'root'
})


export class CuserService {
  model = 'cuser';
  constructor(private httpClient: HttpClient) { }

  getUrl(){
    return `${BASE_URL}${this.model}`;
  }

  getUrlForId(id){
    return `${this.getUrl()}/${id}`;
  }

  all() {
    return this.httpClient.get(this.getUrl());
  }

  create(cuser){
    return this.httpClient.post(this.getUrl(), cuser);
  }
  update(cuser){
    return this.httpClient.put(this.getUrlForId(cuser.id), cuser);
  }
  delete(cuserid){
    return this.httpClient.delete(this.getUrlForId(cuserid));
  }

}
