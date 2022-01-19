import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZoomNonLoginPage } from './zoom-non-login.page';

const routes: Routes = [
  {
    path: '',
    component: ZoomNonLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZoomNonLoginPageRoutingModule {}
