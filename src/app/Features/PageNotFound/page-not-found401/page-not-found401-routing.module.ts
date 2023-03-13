import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFound401Component } from './page-not-found401.component';

const routes: Routes = [{ path: '', component: PageNotFound401Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageNotFound401RoutingModule { }
