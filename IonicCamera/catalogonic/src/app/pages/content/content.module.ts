import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContentPageRoutingModule } from './content-routing.module';
import { ContentPage } from './content.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ContentPageRoutingModule,
    ContentPage
  ]
})
export class ContentPageModule {}
