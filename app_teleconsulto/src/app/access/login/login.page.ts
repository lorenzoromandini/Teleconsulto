import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = "";
  password: string = "";
  regexpEmail: any = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  disabledButton;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private accessProviders: AccessProviders,
    private storage: Storage
  ) { }

  ionViewDidEnter() {
    this.disabledButton = false;
  }

  async tryLogin() {
    if (!this.regexpEmail.test(this.email)) {
      this.presentToast("Devi inserire una Email corretta");
    } else if (this.password.length < 6 ) {
      this.presentToast("Devi inserire una Password di almeno 6 caratteri");
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: "Attendi..."
      });
      loader.present();

      return new Promise(() => {
        let body = {
          request: "process_login",
          email: this.email,
          password: this.password
        }

        this.accessProviders.postData(body, 'process_db.php').subscribe((res: any) => {
          if (res.success == true) {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast("Accesso effettuato");
            this.storage.set('storage_xxx', res.result); // create storage session
            this.navCtrl.navigateRoot(['/home']);
          } else {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast("Email o password incorretti");
          }
        }, (err) => {
          loader.dismiss();
          this.disabledButton = false;
          this.presentToast(err.message);
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

  openRegistration() {
    this.router.navigate(['/registration']);
  }


}
