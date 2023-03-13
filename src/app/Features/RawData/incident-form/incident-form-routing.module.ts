import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentFormComponent } from './incident-form.component';

const routes: Routes = [{ path: '', component: IncidentFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentFormRoutingModule { }
