import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VAutoDataQueryComponent } from './vauto-data-query.component';

const routes: Routes = [{ path: '', component: VAutoDataQueryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VAutoDataQueryRoutingModule { }
