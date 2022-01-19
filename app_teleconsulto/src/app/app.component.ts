import { Component } from '@angular/core';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Zoom } from '@ionic-native/zoom/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  SDK_KEY = 'pAahSXkZJ3O6zyJAZq5nq9JYcL0MlHcZqiUs';
  SDK_SECRET = 'DxylRRFGzHQpjUtrUwBeFXDnAUPouEh9L1df';

  constructor(
    private storage: Storage,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private zoomService: Zoom
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.zoomService.initialize(this.SDK_KEY, this.SDK_SECRET)
        .then((success) => {
          console.log(success);
          this.presentToast(success);
        })
        .catch((error) => {
          console.log(error);
          this.presentToast(error);
        });
    });

    await this.storage.create();
    this.storage.get('storage_xxx').then((res) => {
      if (res == null) {
        this.navCtrl.navigateRoot('/login');
      } else {
        this.navCtrl.navigateRoot('/home')
      }
    });

  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
