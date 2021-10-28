import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Cart } from '@models/models';
import { CartManagerService } from '@services/cart-manager.service';
import { ProductsManagerService } from '@services/products-manager.service';
import { SwiperComponent } from 'ngx-swiper-wrapper';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild("searchInput") searchInput: any;
  searchedText: string = '';
  selectedProductsNumber = 0;
  showSearchInput = false;
  searchTimeOut: any;
  constructor(
      private cartManagerService: CartManagerService,
      private productsManagerService: ProductsManagerService,
      public dialog: MatDialog
    ) {
      cartManagerService.getSelectedProductsNumber().subscribe(
      data => {
        this.selectedProductsNumber = data;
      }
    )
   }




  ngOnInit(): void {
  }

  openShoppingCart() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = 400;
    const dialogRef = this.dialog.open(ShoppingCartDialog,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public clickOnSearchIcon(): void {
    this.showSearchInput=true;
    setTimeout(() => {this.searchInput.nativeElement.focus()},10);
  }

  public onBlurEvent(): void {
    this.showSearchInput=false;
  }
  public search(): void {
    clearTimeout(this.searchTimeOut);
    this.searchTimeOut = setTimeout( () => {
      this.productsManagerService.getSearchTextSubject().next(this.searchedText);
    }, 600)
  }


}


@Component({
  selector: 'shopping-cart-dialog',
  templateUrl: 'shopping-cart-dialog.html',
})
export class ShoppingCartDialog implements OnDestroy {

  public cart!: Cart;
  private $cart!: Subscription;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
 
  constructor(
    private cartManagerService: CartManagerService,
  ) {
    this.$cart = cartManagerService.getCartSubject().subscribe(
      (data: Cart) => {
        this.cart = data;
        this.swiper?.directiveRef?.update();
      }
    );
  }

  ngOnDestroy(): void {
    this.$cart.unsubscribe();
  }

  index = 0;
  config = {
    slidesPerView: 1,
    navigation: true,
    pagination: true
  };
  
}