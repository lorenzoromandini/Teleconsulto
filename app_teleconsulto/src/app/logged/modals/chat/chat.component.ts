import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, ModalController } from '@ionic/angular';
import { Chat } from 'src/app/models/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {

  messaggi: Array<Chat> = [
    {
      mittente: 'Dottor Pacca',
      messaggio: "Sono il king del panzaritto fritto di massi co mortadella e provolone",
      data_ora: "Adesso"
    },
    {
      mittente: 'Mister Food',
      messaggio: "Sono il pacca",
      data_ora: "Ora"
    },
    {
      mittente: 'Mario Draghi',
      messaggio: "Sono finito",
      data_ora: "Oggi"
    }
  ];

  utenteCorrente = "Pacca";
  nuovo_messaggio = '';

  chat: Chat;
  consulto_id: string;

  @ViewChild(IonContent) content: IonContent

  constructor(
    private modalController: ModalController,
    private route: ActivatedRoute
    ) { }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.consulto_id = JSON.parse(params["consulto"]);
      console.log(this.chat)
    })
  }

  sendMessages() {
    this.messaggi.push({
      mittente: "Pacca",
      messaggio: this.nuovo_messaggio
    });

    this.nuovo_messaggio = '';
    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }


}
