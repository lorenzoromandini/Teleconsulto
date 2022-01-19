import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZoomLoginPage } from './zoom-login.page';

const routes: Routes = [
  {
    path: '',
    component: ZoomLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZoomLoginPageRoutingModule {}
