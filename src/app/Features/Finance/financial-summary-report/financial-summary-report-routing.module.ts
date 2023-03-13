import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinancialSummaryReportComponent } from './financial-summary-report.component';

const routes: Routes = [{ path: '', component: FinancialSummaryReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialSummaryReportRoutingModule { }
