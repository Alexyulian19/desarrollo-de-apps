import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FabPageRoutingModule } from './fab-routing.module';
import { FabPage } from './fab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FabPageRoutingModule,
    FabPage
  ]
})
export class FabPageModule {}
