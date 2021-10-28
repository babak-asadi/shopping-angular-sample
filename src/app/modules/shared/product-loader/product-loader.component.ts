import { Component, Input, OnInit } from '@angular/core';
import { ServerCommunicationService } from '../../../core/services/server-communication.service';
import { Product } from '../../../core/models/models';
import { CartManagerService } from '@services/cart-manager.service';

@Component({
  selector: 'app-product-loader',
  templateUrl: './product-loader.component.html',
  styleUrls: ['./product-loader.component.scss']
})
export class ProductLoaderComponent implements OnInit {

  constructor(
    private serverCommunicationService: ServerCommunicationService,
    private cartManagerService: CartManagerService
  ) { }

  numberOfOrderd = 0;
  product!: Product;
  @Input("data")
  set data(data: {id : number, quantity: number}) {
    this.loadProduct(data);
  }

  private async loadProduct(data: {id : number, quantity: number}) : Promise<void> {
    
    this.product = await this.serverCommunicationService.loadProduct(data.id);
    this.numberOfOrderd = data.quantity;
  }

  public addToCard(): void {
    this.cartManagerService.addToCart(this.product);
    this.numberOfOrderd+=1;
  }

  public removeFromCard(): void {
    this.cartManagerService.removeFromCard(this.product);
    this.numberOfOrderd-=1;
  }
  

  ngOnInit(): void {
  }

}
