import { TestBed } from '@angular/core/testing';

import { ApisignService } from './apisign.service';

describe('ApisignService', () => {
  let service: ApisignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApisignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
