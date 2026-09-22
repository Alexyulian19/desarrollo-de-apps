import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonPageRoutingModule } from './button-routing.module';
import { ButtonPage } from './button.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonPageRoutingModule,
    ButtonPage
  ]
})
export class ButtonPageModule {}
