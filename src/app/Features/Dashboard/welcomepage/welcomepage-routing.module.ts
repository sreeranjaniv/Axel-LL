import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomepageComponent } from './welcomepage.component';

const routes: Routes = [{ path: '', component: WelcomepageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomepageRoutingModule { }
