import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataDictionaryComponent } from './data-dictionary.component';

const routes: Routes = [{ path: '', component: DataDictionaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataDictionaryRoutingModule { }
