import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BreadcrumbsPageRoutingModule } from './breadcrumbs-routing.module';
import { BreadcrumbsPage } from './breadcrumbs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbsPageRoutingModule,
    BreadcrumbsPage
  ]
})
export class BreadcrumbsPageModule {}
