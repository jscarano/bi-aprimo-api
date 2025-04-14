import { TestBed } from '@angular/core/testing';

import { DocuveraApiConnectorService } from './docuvera-api-connector.service';

describe('DocuveraApiConnectorService', () => {
  let service: DocuveraApiConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocuveraApiConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
