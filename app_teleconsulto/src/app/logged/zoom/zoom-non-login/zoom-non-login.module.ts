import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZoomNonLoginPageRoutingModule } from './zoom-non-login-routing.module';

import { ZoomNonLoginPage } from './zoom-non-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZoomNonLoginPageRoutingModule
  ],
  declarations: [ZoomNonLoginPage]
})
export class ZoomNonLoginPageModule {}
