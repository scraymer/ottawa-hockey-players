import { TestBed } from '@angular/core/testing';

import { FreeAgentsService } from './free-agents.service';

describe('FreeAgentsService', () => {
  let service: FreeAgentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreeAgentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
