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

  disabledButton;

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
    } else if (this.codice_fiscale.length != 16) {
      this.presentToast("Devi inserire il tuo Codice Fiscale corretto");
    } else if (this.gender == "") {
      this.presentToast("Devi inserire il tuo Gender");
    } else if (this.data_nascita == "") {
      this.presentToast("Devi inserire la tua Data di nascita");
    } else if (this.email.length < 5 || !this.email.includes('@')) {
      this.presentToast("Devi inserire una Email corretta");
    } else if (this.password.length < 6) {
      this.presentToast("Devi inserire una Password di almeno 6 caratteri");
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
          request: "process_register",
          nome: this.nome,
          cognome: this.cognome,
          codice_fiscale: this.codice_fiscale,
          gender: this.gender,
          professione: this.professione,
          data_nascita: this.data_nascita.substr(0, 10),
          email: this.email,
          password: this.password
        }

        this.accessProviders.postData(body, 'process_db.php').subscribe((res: any) => {
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
