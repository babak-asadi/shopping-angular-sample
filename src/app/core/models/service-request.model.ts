export class ServiceRequestModel {
  constructor(
    public serviceName: string,
    public data: any,
    public serviceType: serviceTypes = serviceTypes.raw ,
    public params: any = {},
    public maxResults: number= 10,
    public showBlockUi: boolean = true,
    public sort: string= '',
    public order: string= '',
    public page: number= 1,

) {}


  getData(): any {
        return this.data;
    }
  }

export enum serviceTypes {
  'raw',
  'dataConfig'
}
