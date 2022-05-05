import { TestBed } from '@angular/core/testing';

import { SnackbarinterceptorService } from './snackbarinterceptor.service';

describe('SnackbarinterceptorService', () => {
  let service: SnackbarinterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarinterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
