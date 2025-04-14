import { TestBed } from '@angular/core/testing';

import { DocuveraAddonSdkContextService } from './docuvera-addon-sdk-context.service';

describe('DocuveraAddonSdkContextService', () => {
  let service: DocuveraAddonSdkContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocuveraAddonSdkContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
