import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InfiniteScrollPageRoutingModule } from './infinite-scroll-routing.module';
import { InfiniteScrollPage } from './infinite-scroll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InfiniteScrollPageRoutingModule,
    InfiniteScrollPage
  ]
})
export class InfiniteScrollPageModule {}
