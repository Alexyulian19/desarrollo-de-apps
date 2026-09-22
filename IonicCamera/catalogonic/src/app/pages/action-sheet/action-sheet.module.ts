import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ActionSheetPageRoutingModule } from './action-sheet-routing.module';
import { ActionSheetPage } from './action-sheet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ActionSheetPageRoutingModule,
    ActionSheetPage
  ]
})
export class ActionSheetPageModule {}
