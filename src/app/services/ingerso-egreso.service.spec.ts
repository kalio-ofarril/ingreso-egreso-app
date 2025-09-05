import { TestBed } from '@angular/core/testing';

import { IngersoEgresoService } from './ingerso-egreso.service';

describe('IngersoEgresoService', () => {
  let service: IngersoEgresoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngersoEgresoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
