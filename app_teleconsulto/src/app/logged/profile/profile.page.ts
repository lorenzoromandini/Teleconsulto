import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  datastorage: any;
  id: string;
  nome: string;
  cognome: string;
  codice_fiscale: string;
  data_nascita: string;
  gender: string;
  professione: string;
  email: string;
  password: string = "";
  conferma_password: string = "";
  boolModificaPassword: boolean = false;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private accessProviders: AccessProviders,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.storage.get('storage_xxx').then((res) => {
      this.datastorage = res;
      this.id = this.datastorage.id;
      this.nome = this.datastorage.nome;
      this.cognome = this.datastorage.cognome;
      this.codice_fiscale = this.datastorage.codice_fiscale;
      this.data_nascita = this.datastorage.data_nascita;
      this.gender = this.datastorage.gender;
      this.email = this.datastorage.email;
      this.professione = this.datastorage.professione;
    })
  }

  async updateProfileAlert() {
    const alert = await this.alertCtrl.create({
      header: "Vuoi modificare la password ? Se Sì, verrà effettuato il Logout",
      backdropDismiss: false,
      buttons: [
        {
          text: 'Sì',
          handler: () => {
            this.updatePassword();
          }
        }, {
          text: 'Annulla',
          handler: () => { }
        }
      ]
    });
  }

  async updatePassword() {
    if (this.password.length < 6) {
      this.presentToast("Devi inserire una Password di almeno 6 caratteri");
    } else if (this.conferma_password.length < 6) {
      this.presentToast("La Conferma Password inserita ha meno di 6 caratteri")
    } else if (this.conferma_password != this.password) {
      this.presentToast("Le password inserite non sono uguali")
    }
    else {
      //this.boolModificaPassword = true;
      const loader = await this.loadingCtrl.create({
        message: "Attendi..."
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          request: "update_password",
          id: this.id,
          nuova_password: this.password
        }

        this.accessProviders.postData(body, 'process_db.php').subscribe((res: any) => {
          if (res.success == true) {
            loader.dismiss();
           // this.boolModificaPassword = false;
            this.presentToast(res.msg);
            this.router.navigate(['/login']);
          } else {
            loader.dismiss();
           // this.boolModificaPassword = false;
            this.presentToast(res.msg);
          }
        })
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
          text: 'Sì',
          handler: () => { }
        }, {
          text: 'No',
          handler: () => { }
        }
      ]
    });

    await alert.present();
  }

  async logout() {
    this.storage.clear();
    this.navCtrl.navigateRoot(['/login']);
    const toast = await this.toastCtrl.create({
      message: "Logout effettuato",
      duration: 1500
    })
    toast.present();
  }

}
