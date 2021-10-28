import { Injectable } from '@angular/core';
import { ServiceRequestModel, serviceTypes } from '@models/service-request.model';
import { ApiCallService } from './api-call.service';
import { Product } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ServerCommunicationService {

  constructor(
    private apiCallService: ApiCallService,
  ) { }

  public async loadProducts(searchData: any): Promise<Product[]> {
    const serviceRequestModel: ServiceRequestModel =
    new ServiceRequestModel('/products', {}, serviceTypes.raw, searchData);
    const resp: Product[] = await this.apiCallService.callGetService(serviceRequestModel).toPromise();
    return resp;
  }


  public async loadProduct(productId: number): Promise<Product> {
    const serviceRequestModel: ServiceRequestModel =
    new ServiceRequestModel('/products/'+ productId.toString(), {}, serviceTypes.raw, {});
    const resp: Product = await this.apiCallService.callGetService(serviceRequestModel).toPromise();
    return resp;
  }


}
