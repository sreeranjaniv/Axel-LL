import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFound404Component } from './page-not-found404.component';

const routes: Routes = [{ path: '', component: PageNotFound404Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageNotFound404RoutingModule { }
