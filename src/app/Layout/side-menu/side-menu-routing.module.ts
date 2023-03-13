import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideMenuComponent } from './side-menu.component';

const routes: Routes = [{ path: '', component: SideMenuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideMenuRoutingModule { }
