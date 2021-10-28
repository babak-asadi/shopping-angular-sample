import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Cart, Product } from '@models/models';
import { CartManagerService } from '@services/cart-manager.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnDestroy {

  @Input() product!: Product;
  private $cart!: Subscription;

  constructor(private cartManagerService: CartManagerService) { }
  ngOnDestroy(): void {
    if(this.$cart)
    this.$cart.unsubscribe();
  }
  numberOfOrderd = 0;

  ngOnInit(): void {
    this.syncItemWithCart();

  }
  index = 0;
  config = {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: true,
    lazy: true,
    pagination: true
  };
  private syncItemWithCart(): void {
    this.$cart = this.cartManagerService.getCartSubject().subscribe(
      (data: Cart) => {
        const productCartItem = data.products.filter(
          cartItem => {
            return cartItem.id === this.product.id;
          }
        )
        if (productCartItem.length === 0) {
          this.numberOfOrderd = 0;
        } else {
          this.numberOfOrderd = productCartItem[0].quantity;
        }
      }
    );
  }

  public addToCard(): void {
    this.numberOfOrderd+=1;
    this.cartManagerService.addToCart(this.product);
  }

  public removeFromCard(): void {
    this.numberOfOrderd-=1;
    this.cartManagerService.removeFromCard(this.product);
  }
  

}
