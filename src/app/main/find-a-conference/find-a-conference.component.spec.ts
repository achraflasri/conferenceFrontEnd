import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAConferenceComponent } from './find-a-conference.component';

describe('FindAConferenceComponent', () => {
  let component: FindAConferenceComponent;
  let fixture: ComponentFixture<FindAConferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindAConferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindAConferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
