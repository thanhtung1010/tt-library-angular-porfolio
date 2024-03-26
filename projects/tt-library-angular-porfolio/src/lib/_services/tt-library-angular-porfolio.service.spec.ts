import { TestBed } from '@angular/core/testing';

import { TtLibraryAngularPorfolioService } from './tt-library-angular-porfolio.service';

describe('TtLibraryAngularPorfolioService', () => {
  let service: TtLibraryAngularPorfolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TtLibraryAngularPorfolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
