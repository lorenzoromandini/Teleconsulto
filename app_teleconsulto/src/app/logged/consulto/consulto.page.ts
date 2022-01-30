import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AllegatiComponent } from '../modals/allegati/allegati.component';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';

@Component({
  selector: 'app-consulto',
  templateUrl: './consulto.page.html',
  styleUrls: ['./consulto.page.scss'],
})
export class ConsultoPage implements OnInit {

  datastorage: any;
  partecipanti: any = [];
  consulto: any;
  paziente_nome: string;
  paziente_cognome: string;
  paziente_data_nascita: string;
  paziente_cf: string;
  oggetto: string;
  consulto_id: string;
  id_utente: string;
  boolRichiedente: boolean = false;

  constructor(
    private router: Router,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private accessProviders: AccessProviders,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.consulto = JSON.parse(params["consulto"]);
      this.consulto_id = this.consulto.id_consulto;
      this.paziente_nome = this.consulto.paziente_nome;
      this.paziente_cognome = this.consulto.paziente_cognome;
      this.paziente_cf = this.consulto.paziente_cf;
      this.paziente_data_nascita = this.consulto.paziente_data_nascita;
      this.oggetto = this.consulto.oggetto;
      this.loadPartecipanti();
    })
    this.route.queryParams.subscribe(params => {
      this.id_utente = JSON.parse(params["id_utente"]);
    })
  }

  async loadPartecipanti() {
    this.partecipanti = [];
    return new Promise(resolve => {
      let body = {
        request: "load_partecipanti",
        id_consulto: this.consulto_id,
      }

      this.accessProviders.postData(body, 'process_db.php').subscribe((res: any) => {
        for (let datas of res.result) {
          this.partecipanti.push(datas);
        }
        console.log(this.partecipanti)
        this.checkRichiedente();
        resolve(true);
      })
    })
  }
  
  async removePartecipanteAlert(partecipante_id: string) {
    const alert = await this.alertCtrl.create({
      header: "Vuoi rimuovere questo partecipante?",
      backdropDismiss: false,
      buttons: [
        {
          text: 'Sì',
          handler: () => {
            this.removePartecipante(partecipante_id);
          }
        }, {
          text: 'Annulla',
          handler: () => { }
        }
      ]
    });

    await alert.present();
    await alert.onDidDismiss();
  }

  async removePartecipante(partecipante_id: string) {
    const loader = await this.loadingCtrl.create({
      message: "Rimozione partecipante..."
    });
    loader.present();

    return new Promise(resolve => {
      let body = {
        request: "remove_partecipante",
        id_partecipante: partecipante_id,
      }

      this.accessProviders.postData(body, 'process_db.php').subscribe((res: any) => {
        if (res.success == true) {
          loader.dismiss();
          resolve(true);
        }
        else {
          loader.dismiss();
          this.presentToast(res.msg);
        }
      })

      this.ngOnInit();
    });
  }

  openAddPartecipante() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        consulto_id: JSON.stringify(this.consulto_id),
        partecipanti: JSON.stringify(this.partecipanti)
      }
    };
    this.router.navigate(['/new-partecipant'], navigationExtras);
  }

  async openAllegatiModal() {
    const modal = await this.modalController.create({
      component: AllegatiComponent
    });

    await modal.present();
  }

  async openAllegati() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id_consulto: JSON.stringify(this.consulto_id),
        id_utente: JSON.stringify(this.id_utente)
      }
    };
    this.router.navigate(['/allegati'], navigationExtras);
  }

  openChat() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id_consulto: JSON.stringify(this.consulto_id),
        id_utente: JSON.stringify(this.id_utente)
      }
    };
    this.router.navigate(['/chat'], navigationExtras);
  }

  checkRichiedente() {
    for (var partecipante of this.partecipanti) {
      if (partecipante.medico_id == this.id_utente && partecipante.richiedente == "true") {
        this.boolRichiedente = true;
      }
    }
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 1500,
    });
    toast.present();
  }


}
