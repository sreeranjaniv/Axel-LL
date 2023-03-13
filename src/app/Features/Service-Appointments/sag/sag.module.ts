import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SAGRoutingModule } from './sag-routing.module';
import { SAGComponent } from './sag.component';
import { FiltersPopupComponent } from '../../filters-popup/filters-popup.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SAGRoutingModule,
    
  ],
})
export class SAGModule { }
