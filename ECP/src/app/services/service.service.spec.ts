import { TestBed } from '@angular/core/testing';
// import { ServiceService } from './service.service';
import { HttpService } from './service.service';


describe('ServiceService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
