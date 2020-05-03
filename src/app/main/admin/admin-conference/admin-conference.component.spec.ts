import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConferenceComponent } from './admin-conference.component';

describe('AdminConferenceComponent', () => {
  let component: AdminConferenceComponent;
  let fixture: ComponentFixture<AdminConferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
