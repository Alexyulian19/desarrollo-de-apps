import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavigationPageRoutingModule } from './navigation-routing.module';
import { NavigationPage } from './navigation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NavigationPageRoutingModule,
    NavigationPage
  ]
})
export class NavigationPageModule {}
