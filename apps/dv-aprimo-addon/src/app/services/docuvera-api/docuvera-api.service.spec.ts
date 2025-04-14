import { TestBed } from '@angular/core/testing';

import { DocuveraApiService } from './docuvera-api.service';

describe('DocuveraApiService', () => {
  let service: DocuveraApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocuveraApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
