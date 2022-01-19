import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPazientePageRoutingModule } from './new-paziente-routing.module';

import { NewPazientePage } from './new-paziente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPazientePageRoutingModule
  ],
  declarations: [NewPazientePage]
})
export class NewPazientePageModule {}
