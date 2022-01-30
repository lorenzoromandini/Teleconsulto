import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultoPageRoutingModule } from './consulto-routing.module';
import { ConsultoPage } from './consulto.page';
import { AllegatiComponent } from '../modals/allegati/allegati.component';
import { AutosizeModule } from 'ngx-autosize';

@NgModule({
  entryComponents: [AllegatiComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultoPageRoutingModule,
    AutosizeModule
  ],
  declarations: [ConsultoPage, AllegatiComponent]
})
export class ConsultoPageModule {}
