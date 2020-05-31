import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairUsersComponent } from './chair-users.component';

describe('ChairUsersComponent', () => {
  let component: ChairUsersComponent;
  let fixture: ComponentFixture<ChairUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChairUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChairUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
