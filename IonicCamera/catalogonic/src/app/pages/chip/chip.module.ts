import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChipPageRoutingModule } from './chip-routing.module';
import { ChipPage } from './chip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChipPageRoutingModule,
    ChipPage
  ]
})
export class ChipPageModule {}
