import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastPageRoutingModule } from './toast-routing.module';
import { ToastPage } from './toast.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ToastPageRoutingModule,
    ToastPage
  ]
})
export class ToastPageModule {}
