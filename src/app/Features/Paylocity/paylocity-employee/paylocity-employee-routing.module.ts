import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaylocityEmployeeComponent } from './paylocity-employee.component';

const routes: Routes = [{ path: '', component: PaylocityEmployeeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaylocityEmployeeRoutingModule { }
