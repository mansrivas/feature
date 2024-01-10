import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { FeatureService } from './feature.service';
import { FeatureResponse } from '../../domain/feature-toggle';

describe('FeatureService', () => {
  let service: FeatureService;
  let featureService: FeatureService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeatureService]
    });

    // Inject the service (which imports the HttpClient) and the Test Controller
    featureService = TestBed.inject(FeatureService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected features', () => {
    const mockFeatures:FeatureResponse = { features:[] };

    // Make an HTTP GET request
    featureService.getFeatures().subscribe((data) => {
      expect(data).toEqual(mockFeatures);
    });

    // Expect a single request to the API and respond with mock data
    const req = httpTestingController.expectOne('http://localhost:8081/api/v1/features');
    expect(req.request.method).toBe('GET');
    req.flush(mockFeatures);
  });
});
