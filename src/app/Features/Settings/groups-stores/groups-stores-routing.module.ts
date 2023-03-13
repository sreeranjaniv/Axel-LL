import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsStoresComponent } from './groups-stores.component';

const routes: Routes = [{ path: '', component: GroupsStoresComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsStoresRoutingModule { }
