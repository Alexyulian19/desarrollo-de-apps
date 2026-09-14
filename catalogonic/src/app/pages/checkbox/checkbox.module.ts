import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CheckboxPageRoutingModule } from './checkbox-routing.module';
import { CheckboxPage } from './checkbox.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CheckboxPageRoutingModule,
    CheckboxPage
  ]
})
export class CheckboxPageModule {}
