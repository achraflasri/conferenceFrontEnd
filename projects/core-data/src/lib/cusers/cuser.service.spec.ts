import { TestBed } from '@angular/core/testing';

import { CuserService } from './cuser.service';

describe('CuserService', () => {
  let service: CuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
