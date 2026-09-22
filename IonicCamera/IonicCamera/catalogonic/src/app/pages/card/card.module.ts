import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardPageRoutingModule } from './card-routing.module';
import { CardPage } from './card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CardPageRoutingModule,
    CardPage
  ]
})
export class CardPageModule {}
