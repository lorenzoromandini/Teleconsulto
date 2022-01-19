import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-allegati',
  templateUrl: './allegati.component.html',
  styleUrls: ['./allegati.component.scss'],
})
export class AllegatiComponent {

  allegati = [
    {
      nome: "ahahahhah.png"
    },
    {
      nome: "video.mp4"
    },
    {
      nome: "documento.pdf"
    },
  ]
    
  constructor(private modalController: ModalController) { }

  closeModal() {
    this.modalController.dismiss();
  }

}
