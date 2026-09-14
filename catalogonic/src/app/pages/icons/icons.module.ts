import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IconsPageRoutingModule } from './icons-routing.module';
import { IconsPage } from './icons.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconsPageRoutingModule,
    IconsPage
  ]
})
export class IconsPageModule {}
