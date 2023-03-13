import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreBrandsComponent } from './store-brands.component';

const routes: Routes = [{ path: '', component: StoreBrandsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreBrandsRoutingModule { }
