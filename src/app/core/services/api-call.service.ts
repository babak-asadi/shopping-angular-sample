import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ServiceRequestModel } from '@models/service-request.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(
    private http: HttpClient,
    ) {
      this.apiUrl = environment.apiUrl;
   }
  public apiUrl: string;

  callGetService(serviceRequest: ServiceRequestModel): Observable<any> {
    const queryParams: HttpParams = UtilsService.buildQueryParams(serviceRequest.params);
    let httpOptions = {};
      httpOptions = { params: queryParams };
    if (serviceRequest.showBlockUi) {
    }

    const href = this.apiUrl + serviceRequest.serviceName;

    return this.http.get<any>(href, httpOptions).pipe(
      tap(
        (resp: any) => {
        },
        err => {
         }
      )
    );

  }

}


class UtilsService {
  // tslint:disable-next-line: ban-types
  static buildQueryParams(source: any): HttpParams {
      let target: HttpParams = new HttpParams();
      Object.keys(source).forEach((key: string) => {
          let value: any = source[key];
          value = value.toString();
          target = target.append(key, value);
      });
      return target;
  }
}