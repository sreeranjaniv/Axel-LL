import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadAccountCOAComponent } from './upload-account-coa.component';

const routes: Routes = [{ path: '', component: UploadAccountCOAComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadAccountCOARoutingModule { }
