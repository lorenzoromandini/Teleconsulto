import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPartecipantPageRoutingModule } from './new-partecipant-routing.module';

import { NewPartecipantPage } from './new-partecipant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPartecipantPageRoutingModule
  ],
  declarations: [NewPartecipantPage]
})
export class NewPartecipantPageModule {}
