import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuovoPageRoutingModule } from './nuovo-routing.module';

import { NuovoPage } from './nuovo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuovoPageRoutingModule
  ],
  declarations: [NuovoPage]
})
export class NuovoPageModule {}
