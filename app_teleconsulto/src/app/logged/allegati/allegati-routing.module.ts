import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllegatiPage } from './allegati.page';

const routes: Routes = [
  {
    path: '',
    component: AllegatiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllegatiPageRoutingModule {}
