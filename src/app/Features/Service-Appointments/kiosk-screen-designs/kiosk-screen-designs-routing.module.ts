import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KioskScreenDesignsComponent } from './kiosk-screen-designs.component';

const routes: Routes = [{ path: '', component: KioskScreenDesignsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KioskScreenDesignsRoutingModule { }
