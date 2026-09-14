import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReorderPageRoutingModule } from './reorder-routing.module';
import { ReorderPage } from './reorder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReorderPageRoutingModule,
    ReorderPage
  ]
})
export class ReorderPageModule {}
