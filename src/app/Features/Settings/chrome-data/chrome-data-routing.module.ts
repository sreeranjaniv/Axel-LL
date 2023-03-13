import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChromeDataComponent } from './chrome-data.component';

const routes: Routes = [{ path: '', component: ChromeDataComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChromeDataRoutingModule { }
