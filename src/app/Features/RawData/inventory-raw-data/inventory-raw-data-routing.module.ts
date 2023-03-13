import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryRawDataComponent } from './inventory-raw-data.component';

const routes: Routes = [{ path: '', component: InventoryRawDataComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRawDataRoutingModule { }
