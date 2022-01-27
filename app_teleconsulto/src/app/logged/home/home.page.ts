import { Consulto } from '../../models/consulto';
import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage } from '@ionic/storage';
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  datastorage: any;
  id: string;

  consulti: any = [];

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private accessProviders: AccessProviders,
    private storage: Storage
  ) { }

  ionViewWillEnter() {
    this.consulti = [];
  }

  ionViewDidEnter() {
    this.storage.get('storage_xxx').then((res) => {
      this.datastorage = res;
      this.id = this.datastorage.id;
      this.loadConsulti();
    })
  }

  async doRefresh(event) {
    const loader = await this.loadingCtrl.create({
      message: "Attendi..."
    })
    loader.present();

    this.ionViewWillEnter();
    this.ionViewDidEnter();
    event.target.complete();

    loader.dismiss();
  }

  async loadConsulti() {
    return new Promise(resolve => {
      let body = {
        request: "load_consulti_medico",
        id_medico: this.id,
      }

      this.accessProviders.postData(body, 'process_db.php').subscribe((res: any) => {
        for (let datas of res.result) {
          this.consulti.push(datas);
        }
        resolve(true);
      })
    })
  }

  /*
  async deleteMessage(a) {
    return new Promise(resolve => {
      let body = {
        request: "delete_message",
        id: a
      }

      this.accessProviders.postData(body, 'process_db.php').subscribe((res: any) => {
        if(res.success == true) {
          this.presentToast("Eliminazione completata");
          this.ionViewDidEnter();
        } else {
          this.presentToast("Errore nell'eliminazione")
        }
      })
    })
  }
  */

  openConsulto(consulto: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        consulto: JSON.stringify(consulto),
        id_utente: JSON.stringify(this.id)
      }
    };
    this.router.navigate(['/consulto'], navigationExtras);
  }

}

