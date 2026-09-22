import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TogglePageRoutingModule } from './toggle-routing.module';
import { TogglePage } from './toggle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TogglePageRoutingModule,
    TogglePage
  ]
})
export class TogglePageModule {}
