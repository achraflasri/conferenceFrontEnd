import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from './user';
import { merge, Observable, BehaviorSubject, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/user.service';
import { DataSource } from '@angular/cdk/table';
import { DeleteUserComponent } from './dialogs/delete-user/delete-user.component';
import { UpdateUserComponent } from './dialogs/update-user/update-user.component';
import { CreateUserComponent } from './dialogs/create-user/create-user.component';
import { AuthenticationService } from 'src/app/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chair-users',
  templateUrl: './chair-users.component.html',
  styleUrls: ['./chair-users.component.css']
})
export class ChairUsersComponent implements OnInit {

  toastrService: ToastrService;
  displayedColumns = ['id', 'username', 'email', 'phone', 'role', 'actions'];
  exampleDatabase: UserService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;

  conferences;

  constructor(private userService: UserService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public authenticationService: AuthenticationService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  ngOnInit(): void {
    this.loadData();

  }

  refresh() {
    this.loadData();
  }

  add() {

  }

  addNew(user: User) {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        setTimeout(() => {
          this.exampleDatabase.dataChange.value.push(this.userService.getDialogData());
          this.refreshTable();
        }, 1000);

      }
    });
  }

  startEdit(i: number, id: number, username: string, phone: string, email: string, role: string) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: { id, username, phone, email, role }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        setTimeout(() => {
          // Then you update that record using data from dialogData (values you enetered)
          this.exampleDatabase.dataChange.value[foundIndex] = this.userService.getDialogData();
          // And lastly refresh table
          this.refreshTable();
        }, 1000);

      }
    });
  }

  deleteItem(i: number, id: number, username: string, phone: string, email: string, role: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: { id, username, phone, email, role }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.exampleDatabase = new UserService(this.httpClient, this.authenticationService, this.toastrService);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });

  }

}


export class ExampleDataSource extends DataSource<User> {
  // tslint:disable-next-line: variable-name
  _filterChange = new BehaviorSubject('');


  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: User[] = [];
  renderedData: User[] = [];

  constructor(public _exampleDatabase: UserService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<User[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllUsers();

    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((user: User) => {
        const searchStr = (user.id + user.username + user.phone + user.email + user.role)
          .toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });
      this.filteredData = this.filteredData.filter(user => user.role == "REVIEWER");
      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }
    ));
  }

  disconnect() { }


  /** Returns a sorted copy of the database data. */
  sortData(data: User[]): User[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'username': [propertyA, propertyB] = [a.username, b.username]; break;
        case 'email': [propertyA, propertyB] = [a.email, b.email]; break;
        case 'phone': [propertyA, propertyB] = [a.phone, b.phone]; break;
        case 'role': [propertyA, propertyB] = [a.role, b.role]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

