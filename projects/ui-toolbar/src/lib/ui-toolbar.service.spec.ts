import { TestBed } from '@angular/core/testing';

import { UiToolbarService } from './ui-toolbar.service';

describe('UiToolbarService', () => {
  let service: UiToolbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiToolbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
