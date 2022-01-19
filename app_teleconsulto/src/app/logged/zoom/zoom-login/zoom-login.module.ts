import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZoomLoginPageRoutingModule } from './zoom-login-routing.module';

import { ZoomLoginPage } from './zoom-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZoomLoginPageRoutingModule
  ],
  declarations: [ZoomLoginPage]
})
export class ZoomLoginPageModule {}
