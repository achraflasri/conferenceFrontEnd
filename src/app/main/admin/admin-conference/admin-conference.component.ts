import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConferenceService } from 'src/app/conference.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, merge, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { Conferences } from './Conferences';
import { AuthenticationService } from 'src/app/authentication.service';
import { AddComponent } from './dialogs/add/add.component';
import { UpdateComponent } from './dialogs/update/update.component';
import { DeleteComponent } from './dialogs/delete/delete.component';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-admin-conference',
  templateUrl: './admin-conference.component.html',
  styleUrls: ['./admin-conference.component.css']
})
export class AdminConferenceComponent implements OnInit {
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  toastrService: ToastrService;
  displayedColumns = ['id', 'title', 'datedebut', 'actions'];
  exampleDatabase: ConferenceService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;

  conferences;

  constructor(private conferenceService: ConferenceService,
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

  addNew(issue: Conferences) {
    const dialogRef = this.dialog.open(AddComponent, {
      data: { issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        setTimeout(() => {
          this.exampleDatabase.dataChange.value.push(this.conferenceService.getDialogData());
          this.refreshTable();
        }, 1000);

      }
    });
  }

  startEdit(i: number, id: number, title: string, datedebut: Date) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(UpdateComponent, {
      data: { id, title, datedebut }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        setTimeout(() => {
          // Then you update that record using data from dialogData (values you enetered)
          this.exampleDatabase.dataChange.value[foundIndex] = this.conferenceService.getDialogData();
          // And lastly refresh table
          this.refreshTable();
        }, 1000);

      }
    });
  }

  deleteItem(i: number, id: number, title: string, datedebut: Date) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { id, title, datedebut }
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
    this.exampleDatabase = new ConferenceService(this.httpClient, this.authenticationService, this.toastrService);
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


export class ExampleDataSource extends DataSource<Conferences> {
  // tslint:disable-next-line: variable-name
  _filterChange = new BehaviorSubject('');


  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Conferences[] = [];
  renderedData: Conferences[] = [];

  constructor(public _exampleDatabase: ConferenceService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Conferences[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllConferences();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((conf: Conferences) => {
        const searchStr = (conf.id + conf.title + conf.datedebut.toISOString).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

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
  sortData(data: Conferences[]): Conferences[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string | Date = '';
      let propertyB: number | string | Date = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
        case 'datedebut': [propertyA, propertyB] = [a.datedebut, b.datedebut]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}




