import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoweredByAxelICOComponent } from './powered-by-axel-ico.component';

const routes: Routes = [{ path: '', component: PoweredByAxelICOComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoweredByAxelICORoutingModule { }
