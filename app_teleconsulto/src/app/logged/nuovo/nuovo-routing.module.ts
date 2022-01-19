import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuovoPage } from './nuovo.page';

const routes: Routes = [
  {
    path: '',
    component: NuovoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuovoPageRoutingModule {}
