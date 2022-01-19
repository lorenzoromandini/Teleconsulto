import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultoPageRoutingModule } from './consulto-routing.module';
import { ConsultoPage } from './consulto.page';
import { AddPartecipantsComponent } from '../modals/add-partecipants/add-partecipants.component';
import { AllegatiComponent } from '../modals/allegati/allegati.component';
import { ChatComponent } from '../modals/chat/chat.component';
import { AutosizeModule } from 'ngx-autosize';

@NgModule({
  entryComponents: [AddPartecipantsComponent, AllegatiComponent, ChatComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultoPageRoutingModule,
    AutosizeModule
  ],
  declarations: [ConsultoPage, AddPartecipantsComponent, AllegatiComponent, ChatComponent]
})
export class ConsultoPageModule {}
