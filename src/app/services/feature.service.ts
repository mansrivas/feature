import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeatureRequest, FeatureResponse, FeatureToggle } from '../../domain/feature-toggle';
import { featureGET, featurePOST } from './featureurl.const';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  constructor(private http:HttpClient) { }

  getFeatures(): Observable<FeatureResponse> {
    return this.http.get<FeatureResponse>(featureGET);
  }

  addFeature(featureRequest: FeatureRequest): Observable<any> {
    return this.http.post<any>(featurePOST, featureRequest);
  }
}
