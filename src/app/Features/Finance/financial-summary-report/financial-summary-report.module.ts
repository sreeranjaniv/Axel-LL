import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialSummaryReportRoutingModule } from './financial-summary-report-routing.module';
// import { FinancialSummaryReportComponent } from './financial-summary-report.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgxHttpLoaderModule } from 'ngx-http-loader';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FinancialSummaryReportRoutingModule,
    NgbModule,
    // NgxHttpLoaderModule
  ]
})
export class FinancialSummaryReportModule { }
