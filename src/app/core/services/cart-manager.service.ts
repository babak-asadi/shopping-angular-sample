import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Cart, Product } from '@models/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartManagerService {

  // selectedProductsNumber = 0;
  $selectedProductsNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  
  private cart: Cart = {
    id: 12,
    products: [],
  }
  $cart: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  public getCartSubject(): BehaviorSubject<Cart> {
    return this.$cart;
  }

  public getSelectedProductsNumber(): BehaviorSubject<number> {
    return this.$selectedProductsNumber;
  }

  public addToCart(product :Product): void {
    const sameProductList = this.cart.products.filter(p => p.id === product.id);
    if(sameProductList.length === 1) {
      sameProductList[0].quantity +=1;
    } else {
      this.cart.products.push({id: product.id, quantity: 1})
    }
    // this.selectedProductsNumber+=1;
    this.$selectedProductsNumber.next(this.cart.products.length);
    this.$cart.next(this.cart);
  }

  public removeFromCard(product :Product): void {
    const sameProductList = this.cart.products.filter(p => p.id === product.id);
    if(sameProductList[0].quantity === 1) {
      this.cart.products = this.cart.products.filter(p => p.id !== product.id)
    } else {
      sameProductList[0].quantity -=1;
    }
    // this.selectedProductsNumber+=1;
    this.$selectedProductsNumber.next(this.cart.products.length);
    this.$cart.next(this.cart);
  }

}
