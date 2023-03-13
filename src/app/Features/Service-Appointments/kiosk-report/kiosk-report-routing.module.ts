import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KioskReportComponent } from './kiosk-report.component';

const routes: Routes = [{ path: '', component: KioskReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KioskReportRoutingModule { }
