import { TestBed, inject } from '@angular/core/testing';

import { PasswordDataService } from './password-data.service';

describe('PasswordDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordDataService]
    });
  });

  it('should be created', inject([PasswordDataService], (service: PasswordDataService) => {
    expect(service).toBeTruthy();
  }));
});
