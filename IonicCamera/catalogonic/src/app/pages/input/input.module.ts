import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputPageRoutingModule } from './input-routing.module';
import { InputPage } from './input.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputPageRoutingModule,
    InputPage
  ]
})
export class InputPageModule {}
