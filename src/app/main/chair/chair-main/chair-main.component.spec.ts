import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairMainComponent } from './chair-main.component';

describe('ChairMainComponent', () => {
  let component: ChairMainComponent;
  let fixture: ComponentFixture<ChairMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChairMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChairMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
