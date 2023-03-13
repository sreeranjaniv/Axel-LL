import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentCheckInComponent } from './appointment-check-in.component';

const routes: Routes = [{ path: '', component: AppointmentCheckInComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentCheckInRoutingModule { }
