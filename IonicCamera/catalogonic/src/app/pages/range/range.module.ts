import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RangePageRoutingModule } from './range-routing.module';
import { RangePage } from './range.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RangePageRoutingModule,
    RangePage
  ]
})
export class RangePageModule {}
