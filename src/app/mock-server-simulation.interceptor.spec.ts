import { TestBed } from '@angular/core/testing';

import { MockServerSimulationInterceptor } from './mock-server-simulation.interceptor';

describe('MockServerSimulationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MockServerSimulationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MockServerSimulationInterceptor = TestBed.inject(MockServerSimulationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
