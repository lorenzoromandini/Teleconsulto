import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonContent, LoadingController, ToastController } from '@ionic/angular';
import { Chat } from 'src/app/models/chat';
import { AccessProviders } from 'src/app/providers/access-providers';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {

  utenteCorrente: string;
  nuovo_messaggio = '';

  chat: Array<Chat>;
  messaggi: any = [];
  consulto_id: string;
  id_utente: string;
  messaggio: string;
  messaggioID: string = "";

  @ViewChild(IonContent) content: IonContent

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private route: ActivatedRoute,
    private accessProviders: AccessProviders,
    private alertCtrl: AlertController,
  ) { }

  ionViewWillEnter() {
    this.messaggi = [];
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.consulto_id = JSON.parse(params["id_consulto"]);
    })
    this.route.queryParams.subscribe(params => {
      this.id_utente = JSON.parse(params["id_utente"]);
      this.utenteCorrente = this.id_utente;
    })
    this.loadMessages();
  }

  async loadMessages() {
    return new Promise(resolve => {
      let body = {
        id_consulto: this.consulto_id,
      }

      this.accessProviders.postData(body, 'load_messages').subscribe((res: any) => {
        for (let datas of res.result) {
          this.messaggi.push(datas);
        }
        resolve(true);
      })
    })
  }

  async sendMessage() {
    this.generateID();
    const loader = await this.loadingCtrl.create({
      message: "Invio..."
    });
    loader.present();

    return new Promise(resolve => {
      let body = {
        id_messaggio: this.messaggioID,
        id_consulto: this.consulto_id,
        id_utente: this.id_utente,
        testo: this.nuovo_messaggio,
      }

      this.accessProviders.postData(body, 'send_message').subscribe((res: any) => {
        if (res.success == true) {
          loader.dismiss();
          resolve(true);
        }
        else {
          loader.dismiss();
          this.presentToast(res.msg);
        }
      })

      this.nuovo_messaggio = '';
      setTimeout(() => {
        this.content.scrollToBottom(200);
      });
      this.ionViewWillEnter();
      this.ionViewDidEnter();
    });
  }

  async deleteMessageAlert(message_id: string) {
    const alert = await this.alertCtrl.create({
      header: "Vuoi eliminare il messaggio selezionato?",
      backdropDismiss: false,
      buttons: [
        {
          text: 'Sì',
          handler: () => {
            this.deleteMessage(message_id);
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

  async deleteMessage(message_id: string) {
    const loader = await this.loadingCtrl.create({
      message: "Eliminazione messaggio..."
    });
    loader.present();

    return new Promise(resolve => {
      let body = {
        message_id: message_id,
      }

      this.accessProviders.postData(body, 'delete_message').subscribe((res: any) => {
        if (res.success == true) {
          loader.dismiss();
          resolve(true);
        }
        else {
          loader.dismiss();
          this.presentToast(res.msg);
        }
      })

      this.nuovo_messaggio = '';
      setTimeout(() => {
        this.content.scrollToBottom(200);
      });
      this.ionViewWillEnter();
      this.ionViewDidEnter();
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
    for (var i = 0; i < 30; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.messaggioID = result;
    return this.messaggioID;
  }

}
