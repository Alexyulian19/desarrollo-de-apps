import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GridPageRoutingModule } from './grid-routing.module';
import { GridPage } from './grid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GridPageRoutingModule,
    GridPage
  ]
})
export class GridPageModule {}
