import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostumerSideRoutingModule } from './costumer-side-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { SharedModule } from '@modules/shared/shared.module';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CostumerSideRoutingModule
  ]
})
export class CostumerSideModule { }
