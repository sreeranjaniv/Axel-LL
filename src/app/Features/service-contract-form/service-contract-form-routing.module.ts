import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceContractFormComponent } from './service-contract-form.component';

const routes: Routes = [{ path: '', component: ServiceContractFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceContractFormRoutingModule { }
