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

  constructor(
    private alertController: AlertController,
    private route: ActivatedRoute,
  ) { }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.paziente = JSON.parse(params["paziente"]);
      console.log(this.paziente)
      this.pazienti.push(this.paziente)
      console.log(this.pazienti)
    })
    this.route.queryParams.subscribe(params => {
      this.partecipante = JSON.parse(params["partecipante"]);
      console.log(this.partecipanti)
      this.partecipanti.push(this.partecipante)
    })
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
            this.rimuoviAssistito(paziente);
          }
        }, {
          text: 'No',
        }
      ]
    });

    await alert.present();
    await alert.onDidDismiss();
  }


  async rimuoviPartecipanteAlert(partecipante: Medico) {
    const alert = await this.alertController.create({
      header: "Rimuovi",
      message: "Sei sicuro di voler rimuovere il partecipante ?",
      buttons: [
        {
          text: 'SÌ',
          handler: () => {
            this.rimuoviPartecipante(partecipante);
          }
        }, {
          text: 'No',
        }
      ]
    });

    await alert.present();
    await alert.onDidDismiss();
  }

  rimuoviAssistito(paziente: Paziente) {
    let index = this.pazienti.indexOf(paziente);

    if (index > -1)
      this.pazienti.splice(index, 1)
  }

  rimuoviPartecipante(partecipante: Medico) {
    let index = this.partecipanti.indexOf(partecipante);

    if (index > -1)
      this.partecipanti.splice(index, 1)
  }


}
