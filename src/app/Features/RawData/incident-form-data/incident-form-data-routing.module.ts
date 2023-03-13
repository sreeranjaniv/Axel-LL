import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentFormDataComponent } from './incident-form-data.component';

const routes: Routes = [{ path: '', component: IncidentFormDataComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentFormDataRoutingModule { }
