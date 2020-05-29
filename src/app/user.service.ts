import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from './main/admin/admin-users/User';

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

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public host: string = "http://localhost:8080/cusers";
  public host2: string = "http://localhost:8080";

  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // Temporarily stores data from dialogs 
  dialogData: any;
  userForm: UserForm;

  constructor(public httpClient: HttpClient,
    public authenticationService: AuthenticationService,
    private toastrService: ToastrService) { }

  get data(): User[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }


  createAuthorAccount(author: UserForm): void {
    let headers = new HttpHeaders();
    headers.append('authorization', 'Bearer ' + this.authenticationService.jwt);
    headers.append('Content-Type', 'application/json');
    this.httpClient.post(this.host2 + "/createAuthor", author, { headers: headers, responseType: 'text' }).subscribe(data => {
      this.userForm = author;
      console.log(data);
    }),
      (err: HttpErrorResponse) => {
        console.log(err);
      };
  }

  /** CRUD METHODS */
  getAllUsers(): void {
    let headers = new HttpHeaders({ 'authorization': 'Bearer ' + this.authenticationService.jwt })
    this.httpClient.get<User[]>(this.host, { headers: headers }).subscribe(data => {
      this.dataChange.next(data['_embedded']['cusers']);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  createUser(user: User): void {
    let headers = new HttpHeaders({ 'authorization': 'Bearer ' + this.authenticationService.jwt });
    this.httpClient.post(this.host, user, { headers: headers }).subscribe(data => {
      this.dialogData = user;
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

  updateUser(user: User): void {
    let headers = new HttpHeaders({ 'authorization': 'Bearer ' + this.authenticationService.jwt });
    this.httpClient.put(this.host + "/" + user.id, user, { headers: headers }).subscribe(data => {
      this.dialogData = user;
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

  deleteUser(id: number): void {
    let headers = new HttpHeaders({ 'authorization': 'Bearer ' + this.authenticationService.jwt });
    this.httpClient.delete(this.host + "/" + id, { headers: headers }).subscribe(data => {
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
