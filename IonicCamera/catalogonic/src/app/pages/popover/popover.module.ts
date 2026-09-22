import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PopoverPageRoutingModule } from './popover-routing.module';
import { PopoverPage } from './popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PopoverPageRoutingModule,
    PopoverPage
  ]
})
export class PopoverPageModule {}
