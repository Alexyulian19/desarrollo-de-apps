import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalPageRoutingModule } from './modal-routing.module';
import { ModalPage } from './modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalPageRoutingModule,
    ModalPage
  ]
})
export class ModalPageModule {}
