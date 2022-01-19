import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, LoadingController, ToastController } from '@ionic/angular';
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

  @ViewChild(IonContent) content: IonContent

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private route: ActivatedRoute,
    private accessProviders: AccessProviders
  ) { }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.consulto_id = JSON.parse(params["id_consulto"]);
      console.log(this.consulto_id)
    })
    this.route.queryParams.subscribe(params => {
      this.id_utente = JSON.parse(params["id_utente"]);
      this.utenteCorrente = this.id_utente;
      console.log("Utente Corrente" + this.utenteCorrente)
    })
    this.loadMessages();
  }

  async loadMessages() {
    return new Promise(resolve => {
      let body = {
        request: "load_messages",
        id_consulto: this.consulto_id,
      }

      this.accessProviders.postData(body, 'process_db.php').subscribe((res: any) => {
        for (let datas of res.result) {
          this.messaggi.push(datas);
          console.log(datas)
        }
        resolve(true);
      })
    })
  }

  async sendMessage() {
    const loader = await this.loadingCtrl.create({
      message: "Invio..."
    });
    loader.present();

    return new Promise(resolve => {
      let body = {
        request: "send_message",
        id_consulto: this.consulto_id,
        id_utente: this.id_utente,
        messaggio: this.nuovo_messaggio,
      }

      console.log(body)

      this.accessProviders.postData(body, 'process_db.php').subscribe((res: any) => {
        if (res.success == true) {
          console.log(res.success)
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
    })
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 1500,
    });
    toast.present();
  }

}
