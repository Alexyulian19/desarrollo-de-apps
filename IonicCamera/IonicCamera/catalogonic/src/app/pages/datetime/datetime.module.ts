import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DatetimePageRoutingModule } from './datetime-routing.module';
import { DatetimePage } from './datetime.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DatetimePageRoutingModule,
    DatetimePage
  ]
})
export class DatetimePageModule {}
