import { Paziente } from '../../models/paziente';
import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Medico } from '../../models/medico';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-nuovo',
  templateUrl: './nuovo.page.html',
  styleUrls: ['./nuovo.page.scss'],
})

export class NuovoPage {

  datastorage: any;
  medico_id: string;

  paziente: Paziente;
  pazienti: Array<Paziente> = [];
  partecipante: Medico;
  partecipanti: Array<Medico> = [];
  oggetto: String = "";

  boolSalva: boolean = false;
  boolPaziente: boolean = false;
  consultoID: string = "";

  constructor(
    private router: Router,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    private accessProviders: AccessProviders,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.storage.get('storage_xxx').then((res) => {
      this.datastorage = res;
      this.medico_id = this.datastorage.id;
    });
  }

  ionViewWillEnter() {
    this.pazienti = [];
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.paziente = JSON.parse(params["paziente"]);
      this.pazienti.push(this.paziente)
    })
    this.checkSalva();
  }

  async rimuoviAssistitoAlert() {
    const alert = await this.alertController.create({
      header: "Rimuovi",
      message: "Sei sicuro di voler rimuovere l'assistito ?",
      buttons: [
        {
          text: 'Sì',
          handler: () => {
            this.rimuoviAssistito();
          }
        }, {
          text: 'No',
        }
      ]
    });

    await alert.present();
    await alert.onDidDismiss();
  }

  rimuoviAssistito() {
    this.pazienti = [];
    this.checkSalva();
  }

  checkSalva() {
    if (this.checkPaziente() && this.oggetto != "" && this.oggetto != null) {
      this.boolSalva = true;
    } else this.boolSalva = false;

    return this.boolSalva;
  }

  checkPaziente() {
    if (this.pazienti.length == 1) {
      this.boolPaziente = true;
    } else this.boolPaziente = false;

    return this.boolPaziente;
  }

  async addConsulto() {
    this.generateID();
    const loader = await this.loadingCtrl.create({
      message: "Inserimento consulto..."
    });
    loader.present();

    return new Promise(resolve => {
      let body = {
        request: "nuovo_consulto",
        id_consulto: this.consultoID,
        oggetto: this.oggetto.charAt(0).toUpperCase() + this.oggetto.slice(1),
        paziente: this.pazienti[0].id,
      }

      this.accessProviders.postData(body, 'process_db.php').subscribe((res: any) => {
        if (res.success == true) {
          this.newConsultoPartecipante()
          loader.dismiss();
          resolve(true);
        }
        else {
          loader.dismiss();
          this.presentToast(res.msg);
        }
      })
    
      this.router.navigate(['/home']);
    });

  }

  async newConsultoPartecipante() {
    return new Promise(resolve => {
      let body = {
        request: "nuovo_consultoPartecipante",
        id_consulto: this.consultoID,
        id_medico: this.medico_id,
        richiedente: 'true',
      }

      this.accessProviders.postData(body, 'process_db.php').subscribe((res: any) => {
        if (res.success == true) {
          this.presentToast(res.msg);
          resolve(true);
        }
        else {
          this.presentToast(res.msg);
        }
      })
    });
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 1500,
    });
    toast.present();
  }

  generateID() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.consultoID = result;
    return this.consultoID;
  }


}
