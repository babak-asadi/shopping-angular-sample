import { Component, OnInit } from '@angular/core';
import { Product } from '@models/models';
import { ProductsManagerService } from '@services/products-manager.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
      private productsManagerService: ProductsManagerService
    ) {
    
  }
  searchedText = '';
  products: Product[] = [];
  ngOnInit(): void {
    this.productsManagerService.getProductsSubject().subscribe(
      (products: Product[]) => {
        console.log(products)
        this.products = products;  
      }
    )

    this.productsManagerService.getSearchTextSubject().subscribe(
      (text: string) => {
        this.searchedText = text;
        this.productsManagerService.search(text);

      }
    )
  }

  onScroll() {
    this.productsManagerService.loadNextPage();
  }
}
