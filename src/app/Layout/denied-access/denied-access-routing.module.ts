import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeniedAccessComponent } from './denied-access.component';

const routes: Routes = [{ path: '', component: DeniedAccessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeniedAccessRoutingModule { }
