import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EleadsOpportunityComponent } from './eleads-opportunity.component';

const routes: Routes = [{ path: '', component: EleadsOpportunityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EleadsOpportunityRoutingModule { }
