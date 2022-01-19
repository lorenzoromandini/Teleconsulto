import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPazientePage } from './new-paziente.page';

const routes: Routes = [
  {
    path: '',
    component: NewPazientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPazientePageRoutingModule {}
