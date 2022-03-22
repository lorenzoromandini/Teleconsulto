import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {

  nome: string = "";
  cognome: string = "";
  codice_fiscale: string = "";
  gender: string = "";
  data_nascita: string = "";
  professione: string = "";
  email: string = "";
  password: string = "";
  conferma_password: string = "";
  regexpEmail: any = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  regexpCF: any = new RegExp(/^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/i);

  disabledButton: boolean;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accessProviders: AccessProviders
  ) { }

  ionViewDidEnter() {
    this.disabledButton = false;
  }


  async tryRegister() {
    if (this.nome.length < 1) {
      this.presentToast("Devi inserire il tuo Nome");
    } else if (this.cognome.length < 1) {
      this.presentToast("Devi inserire il tuo Cognome");
    } else if (!this.regexpCF.test(this.codice_fiscale)) {
      this.presentToast("Devi inserire il tuo Codice Fiscale corretto");
    } else if (this.gender == "") {
      this.presentToast("Devi inserire il tuo Gender");
    } else if (this.data_nascita == "") {
      this.presentToast("Devi inserire la tua Data di nascita");
    } else if (!this.regexpEmail.test(this.email)) {
      this.presentToast("Devi inserire una Email corretta");
    } else if (this.password.length < 6) {
      this.presentToast("Devi inserire una Password di almeno 6 caratteri");
    } else if (this.conferma_password.length < 6) {
      this.presentToast("La Conferma Password inserita ha meno di 6 caratteri")
    } else if (this.conferma_password != this.password) {
      this.presentToast("Le password inserite non sono uguali");
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: "Attendi..."
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          nome: this.nome.charAt(0).toUpperCase() + this.nome.slice(1),
          cognome: this.cognome.charAt(0).toUpperCase() + this.cognome.slice(1),
          codice_fiscale: this.codice_fiscale.toUpperCase(),
          gender: this.gender,
          professione: this.professione.charAt(0).toUpperCase() + this.professione.slice(1),
          data_nascita: this.data_nascita.substr(0, 10),
          email: this.email,
          password: this.password
        }

        this.accessProviders.postData(body, 'process_register').subscribe((res: any) => {
          if (res.success == true) {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
            this.router.navigate(['/login']);
          } else {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
          }
        }, (err) => {
          loader.dismiss();
          this.disabledButton = false;
          this.presentAlert("Timeout");
        });
      })
    }
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 1500,
      position: "top"
    });
    toast.present();
  }

  async presentAlert(text) {
    const alert = await this.alertCtrl.create({
      header: text,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Chiudi',
          handler: () => { }
        }, {
          text: 'Riprova',
          handler: () => {
            this.tryRegister();
          }
        }
      ]
    });

    await alert.present();
  }

}
