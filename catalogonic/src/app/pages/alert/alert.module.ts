import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlertPageRoutingModule } from './alert-routing.module';
import { AlertPage } from './alert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AlertPageRoutingModule,
    AlertPage
  ]
})
export class AlertPageModule {}
