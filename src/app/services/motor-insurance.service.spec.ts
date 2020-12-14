import { TestBed } from '@angular/core/testing';

import { MotorInsuranceService } from './motor-insurance.service';

describe('MotorInsuranceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MotorInsuranceService = TestBed.get(MotorInsuranceService);
    expect(service).toBeTruthy();
  });
});
