import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectPageRoutingModule } from './select-routing.module';
import { SelectPage } from './select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SelectPageRoutingModule,
    SelectPage
  ]
})
export class SelectPageModule {}
