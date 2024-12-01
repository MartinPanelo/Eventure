import { TestBed } from '@angular/core/testing';

import { ShowTService } from './show-t.service';

describe('ShowTService', () => {
  let service: ShowTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
