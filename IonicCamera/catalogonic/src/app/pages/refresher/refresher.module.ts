import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RefresherPageRoutingModule } from './refresher-routing.module';
import { RefresherPage } from './refresher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RefresherPageRoutingModule,
    RefresherPage
  ]
})
export class RefresherPageModule {}
