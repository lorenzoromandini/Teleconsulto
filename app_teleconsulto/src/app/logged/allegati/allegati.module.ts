import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllegatiPageRoutingModule } from './allegati-routing.module';

import { AllegatiPage } from './allegati.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllegatiPageRoutingModule
  ],
  declarations: [AllegatiPage]
})
export class AllegatiPageModule {}
