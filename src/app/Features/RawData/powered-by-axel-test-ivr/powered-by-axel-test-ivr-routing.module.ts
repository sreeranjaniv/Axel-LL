import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoweredByAxelTestIVRComponent } from './powered-by-axel-test-ivr.component';

const routes: Routes = [{ path: '', component: PoweredByAxelTestIVRComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoweredByAxelTestIVRRoutingModule { }
