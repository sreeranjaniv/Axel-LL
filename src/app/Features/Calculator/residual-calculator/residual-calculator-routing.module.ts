import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResidualCalculatorComponent } from './residual-calculator.component';

const routes: Routes = [{ path: '', component: ResidualCalculatorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidualCalculatorRoutingModule { }
