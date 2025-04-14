import { TestBed } from '@angular/core/testing';

import { DocuveraProjectService } from './docuvera-project.service';

describe('DocuveraProjectService', () => {
  let service: DocuveraProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocuveraProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
