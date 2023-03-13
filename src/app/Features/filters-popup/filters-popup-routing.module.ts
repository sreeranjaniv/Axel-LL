import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltersPopupComponent } from './filters-popup.component';

const routes: Routes = [{ path: '', component: FiltersPopupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiltersPopupRoutingModule { }
