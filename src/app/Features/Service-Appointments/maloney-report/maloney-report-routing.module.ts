import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaloneyReportComponent } from './maloney-report.component';

const routes: Routes = [{ path: '', component: MaloneyReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaloneyReportRoutingModule { }
