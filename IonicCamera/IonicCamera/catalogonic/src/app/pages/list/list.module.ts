import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListPageRoutingModule } from './list-routing.module';
import { ListPage } from './list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ListPageRoutingModule,
    ListPage
  ]
})
export class ListPageModule {}
