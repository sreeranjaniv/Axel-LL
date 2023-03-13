import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesServiceOverviewComponent } from './sales-service-overview.component';

const routes: Routes = [{ path: '', component: SalesServiceOverviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesServiceOverviewRoutingModule { }
