import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultoPage } from './consulto.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultoPageRoutingModule {}
