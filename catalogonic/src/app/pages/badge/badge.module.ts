import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BadgePageRoutingModule } from './badge-routing.module';
import { BadgePage } from './badge.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BadgePageRoutingModule,
    BadgePage
  ]
})
export class BadgePageModule {}
