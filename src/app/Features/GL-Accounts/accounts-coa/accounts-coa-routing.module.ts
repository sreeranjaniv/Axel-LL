import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountsCoaComponent } from './accounts-coa.component';

const routes: Routes = [{ path: '', component: AccountsCoaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsCoaRoutingModule { }
