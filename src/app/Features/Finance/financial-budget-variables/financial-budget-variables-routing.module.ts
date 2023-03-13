import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinancialBudgetVariablesComponent } from './financial-budget-variables.component';

const routes: Routes = [{ path: '', component: FinancialBudgetVariablesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialBudgetVariablesRoutingModule { }
