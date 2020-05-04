import { TestBed } from '@angular/core/testing';

import { UiLoginService } from './ui-login.service';

describe('UiLoginService', () => {
  let service: UiLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
