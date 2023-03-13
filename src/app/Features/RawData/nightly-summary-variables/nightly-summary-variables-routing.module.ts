import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NightlySummaryVariablesComponent } from './nightly-summary-variables.component';

const routes: Routes = [{ path: '', component: NightlySummaryVariablesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NightlySummaryVariablesRoutingModule { }
