import { Injectable } from '@angular/core';
import { Product } from '@models/models';
import { BehaviorSubject } from 'rxjs';
import { ServerCommunicationService } from './server-communication.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsManagerService {
  
  private page = 0;
  private perPage = 12;
  private searchedText = '';
  private products: Product[] = [];
  private $products: BehaviorSubject<Product[]> = new BehaviorSubject(this.products);
  private $searchText: BehaviorSubject<string> = new BehaviorSubject(this.searchedText);

  public getProductsSubject(): BehaviorSubject<Product[]> {
    return this.$products;
  }

  public getSearchTextSubject(): BehaviorSubject<string> {
    return this.$searchText;
  }


  constructor(private serverCommunicationService:ServerCommunicationService) {
    this.loadData()
  }

  private async loadData(): Promise<void> {
    const searchObject = {'_page': this.page,'_limit': this.perPage};
    if(this.searchedText.length > 0) {
      Object.assign(searchObject, {q: this.searchedText});
    }
    this.products =this.products.concat(await this.serverCommunicationService.loadProducts(searchObject));
    this.$products.next(this.products);
  }

  public loadNextPage(): void {
    this.page += 1;
    this.loadData();
  }


  public search(text: string): void {
    if (text !== this.searchedText) {
      this.searchedText = text;
      this.page = 0;
      this.products = [];
      this.loadData();
    }
  }
}
