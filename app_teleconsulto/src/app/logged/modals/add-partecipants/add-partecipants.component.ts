import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Medico } from 'src/app/models/medico';

@Component({
  selector: 'app-add-partecipants',
  templateUrl: './add-partecipants.component.html',
  styleUrls: ['./add-partecipants.component.scss'],
})
export class AddPartecipantsComponent {

  dottori: Array<Medico> = [
    {
      nome: "Dottor Pacca",
      codice_fiscale: "DTTOE455FJ",
      professione: "Chirurgo"
    },
    {
      nome: "Mr Hide",
      codice_fiscale: "HSSMOD87DB",
      professione: "Paleontologo"
    },
    {
      nome: "Gino Contessi",
      codice_fiscale: "GNCNT455GH",
      professione: "Cuoco"
    }
  ]

  constructor(private modalController: ModalController) { }
   
  closeModal() {
    this.modalController.dismiss();
  }

}
