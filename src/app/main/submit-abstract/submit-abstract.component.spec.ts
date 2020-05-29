import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitAbstractComponent } from './submit-abstract.component';

describe('SubmitAbstractComponent', () => {
  let component: SubmitAbstractComponent;
  let fixture: ComponentFixture<SubmitAbstractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitAbstractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitAbstractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
