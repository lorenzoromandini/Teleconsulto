import { Paziente } from '../../models/paziente';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Medico } from '../../models/medico';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nuovo',
  templateUrl: './nuovo.page.html',
  styleUrls: ['./nuovo.page.scss'],
})

export class NuovoPage {

  paziente: Paziente;
  pazienti: Array<Paziente> = [];
  partecipante: Medico;
  partecipanti: Array<Medico> = [];
  oggetto: String = "";

  boolSalva: boolean = false;
  boolPaziente: boolean = false;

  constructor(
    private alertController: AlertController,
    private route: ActivatedRoute,
  ) { }

  ionViewWillEnter() {
    this.pazienti = [];
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.paziente = JSON.parse(params["paziente"]);
      console.log(this.paziente)
      this.pazienti.push(this.paziente)
      console.log(this.pazienti)
    })
    this.checkSalva();
  }

  async saveNuovoConsultoAlert() {
    const alert = await this.alertController.create({
      header: "Salvato !",
      message: "Nuovo Consulto salvato",
      buttons: ["Ok"]
    });

    await alert.present();
    await alert.onDidDismiss();
  }

  async rimuoviAssistitoAlert(paziente: Paziente) {
    const alert = await this.alertController.create({
      header: "Rimuovi",
      message: "Sei sicuro di voler rimuovere l'assistito ?",
      buttons: [
        {
          text: 'SÌ',
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
    if (this.checkPaziente() && this.oggetto != "") {
      this.boolSalva = true;
    }
    else this.boolSalva = false;

    return this.boolSalva;
  }

  checkPaziente() {
    if (this.pazienti.length == 1) {
      this.boolPaziente = true;
    } else this.boolPaziente = false;

    return this.boolPaziente;
  }


}
