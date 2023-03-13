import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ELeadsCustomersComponent } from './eleads-customers.component';

const routes: Routes = [{ path: '', component: ELeadsCustomersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ELeadsCustomersRoutingModule { }
