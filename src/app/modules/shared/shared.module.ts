import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '@modules/shared/material-module';
import { DiscountPipe } from '@pipes/discount.pipe';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { ProductLoaderComponent } from './product-loader/product-loader.component';
@NgModule({
  declarations: [
    DiscountPipe,
    ProductLoaderComponent,
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    DemoMaterialModule,
    FormsModule,
    SwiperModule
  ],
  exports: [
    DemoMaterialModule,
    DiscountPipe,
    FormsModule,
    InfiniteScrollModule,
    SwiperModule,
    ProductLoaderComponent
  ],
  entryComponents: [DiscountPipe,ProductLoaderComponent]
})
export class SharedModule { }
