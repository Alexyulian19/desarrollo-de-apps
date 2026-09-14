import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchbarPageRoutingModule } from './searchbar-routing.module';
import { SearchbarPage } from './searchbar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SearchbarPageRoutingModule,
    SearchbarPage
  ]
})
export class SearchbarPageModule {}
