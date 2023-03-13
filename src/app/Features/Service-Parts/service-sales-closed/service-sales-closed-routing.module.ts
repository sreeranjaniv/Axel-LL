import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceSalesClosedComponent } from './service-sales-closed.component';

const routes: Routes = [{ path: '', component: ServiceSalesClosedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceSalesClosedRoutingModule { }
