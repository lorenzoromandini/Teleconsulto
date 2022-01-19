import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPartecipantPage } from './new-partecipant.page';

const routes: Routes = [
  {
    path: '',
    component: NewPartecipantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPartecipantPageRoutingModule {}
