import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProgressIndicatorsPageRoutingModule } from './progress-indicators-routing.module';
import { ProgressIndicatorsPage } from './progress-indicators.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProgressIndicatorsPageRoutingModule,
    ProgressIndicatorsPage
  ]
})
export class ProgressIndicatorsPageModule {}
