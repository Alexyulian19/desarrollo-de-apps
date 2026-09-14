import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RadioPageRoutingModule } from './radio-routing.module';
import { RadioPage } from './radio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RadioPageRoutingModule,
    RadioPage
  ]
})
export class RadioPageModule {}
