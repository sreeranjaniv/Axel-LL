import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SAGComponent } from './sag.component';

const routes: Routes = [{ path: '', component: SAGComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SAGRoutingModule { }
