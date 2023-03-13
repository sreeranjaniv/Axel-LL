import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoweredByAxelIVRComponent } from './powered-by-axel-ivr.component';

const routes: Routes = [{ path: '', component: PoweredByAxelIVRComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoweredByAxelIVRRoutingModule { }
