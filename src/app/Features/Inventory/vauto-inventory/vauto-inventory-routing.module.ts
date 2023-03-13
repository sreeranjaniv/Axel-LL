import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VautoInventoryComponent } from './vauto-inventory.component';

const routes: Routes = [{ path: '', component: VautoInventoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VautoInventoryRoutingModule { }
