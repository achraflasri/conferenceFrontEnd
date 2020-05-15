import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinnerooComponent } from './loading-spinneroo.component';

describe('LoadingSpinnerooComponent', () => {
  let component: LoadingSpinnerooComponent;
  let fixture: ComponentFixture<LoadingSpinnerooComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingSpinnerooComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSpinnerooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
