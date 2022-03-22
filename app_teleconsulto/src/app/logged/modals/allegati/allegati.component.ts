import { Component } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire//compat/storage';
import { AccessProviders } from 'src/app/providers/access-providers';
import { PreviewAnyFile } from '@awesome-cordova-plugins/preview-any-file/ngx';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';

@Component({
  selector: 'app-allegati',
  templateUrl: './allegati.component.html',
  styleUrls: ['./allegati.component.scss'],
})
export class AllegatiComponent {

  datastorage: any;
  file: any;
  ref: any;
  fileUrl: string = "";
  fileName: string = "";
  messaggioID: string = "";
  id_utente;
  id_consulto;
  allegati: any = [];
  boolInvia: boolean = false;
  dateTime;

  constructor(
    private toastCtrl: ToastController,
    private accessProviders: AccessProviders,
    private loadingCtrl: LoadingController,
    private modalController: ModalController,
    // private previewFile: PreviewAnyFile,
    private downloader: Downloader,
    private firebaseStorage: AngularFireStorage) { }

  ngOnInit() {
    setTimeout(() => {
      this.dateTime = new Date().toISOString();
    });
  }

  ionViewWillEnter() {
    this.allegati = [];
    this.file = null;
    this.boolInvia = false;
  }

  ionViewDidEnter() {
    this.loadAllegati();
  }

  async loadAllegati() {
    return new Promise(resolve => {
      let body = {
        id_consulto: this.id_consulto,
      }

      this.accessProviders.postData(body, 'load_allegati').subscribe((res: any) => {
        for (let datas of res.result) {
          this.allegati.push(datas);
        }
        resolve(true);
      })
    })
  }

  selectFile() {
    this.file = (<HTMLInputElement>document.getElementById("file")).files[0];
    this.boolInvia = true;
  }

  async uploadFile() {
    const loader = await this.loadingCtrl.create({
      message: "Caricamento allegato..."
    });
    loader.present();

    let ref = this.firebaseStorage.ref(this.id_consulto + '/' + this.file.name + '_' + this.dateTime);
    ref.put(this.file).then(() => {
      ref.getDownloadURL().subscribe(url => {
        this.fileUrl = url;
        this.fileName = this.file.name;
      }).add(() => {
        this.uploadAllegatoToDB();
        loader.dismiss();
        this.ionViewWillEnter();
        this.ionViewDidEnter();
      })
    }).catch(e => {
      console.log(e);
    })
  }

  async uploadAllegatoToDB() {
    this.generateID();

    return new Promise(resolve => {
      let body = {
        id_messaggio: this.messaggioID,
        id_consulto: this.id_consulto,
        id_utente: this.id_utente,
        testo: this.fileName,
        allegato: this.fileUrl
      }

      this.accessProviders.postData(body, 'send_allegato').subscribe((res: any) => {
        if (res.success == true) {
          this.presentToast(res.msg);
          resolve(true);
        }
        else {
          this.presentToast(res.msg);
        }
      })
    });
  }


  /*
  openAllegato(urlAllegato: string) {
    this.previewFile.preview(urlAllegato).then(() => {

    }, (err) => {
      alert(JSON.stringify(err));
    })

  }
  */


  openFileInBrowser(urlAllegato: string) {
    window.open(urlAllegato, '_system', 'location-yes');
  }

  downloadAllegato(urlAllegato: string, titolo: string) {
    var request: DownloadRequest = {
      uri: urlAllegato,
      title: titolo,
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalPublicDir: {
        dirType: "Downloads",
        subPath: titolo
      }
    }

    this.downloader.download(request).then((location: string) => {
      alert("File salvato in : " + location)
    })

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

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 1500,
    });
    toast.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
