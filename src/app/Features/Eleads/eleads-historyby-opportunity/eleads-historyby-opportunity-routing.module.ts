import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ELeadsHistorybyOpportunityComponent } from './eleads-historyby-opportunity.component';

const routes: Routes = [{ path: '', component: ELeadsHistorybyOpportunityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ELeadsHistorybyOpportunityRoutingModule { }
