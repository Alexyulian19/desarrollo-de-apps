import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SegmentPageRoutingModule } from './segment-routing.module';
import { SegmentPage } from './segment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SegmentPageRoutingModule,
    SegmentPage
  ]
})
export class SegmentPageModule {}
