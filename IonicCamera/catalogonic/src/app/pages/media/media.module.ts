import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MediaPageRoutingModule } from './media-routing.module';
import { MediaPage } from './media.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MediaPageRoutingModule,
    MediaPage
  ]
})
export class MediaPageModule {}
