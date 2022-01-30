import { Component } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire//compat/storage';
import { Storage } from '@ionic/storage';
import { AccessProviders } from 'src/app/providers/access-providers';

@Component({
  selector: 'app-allegati',
  templateUrl: './allegati.component.html',
  styleUrls: ['./allegati.component.scss'],
})
export class AllegatiComponent {

  allegatiX = [
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

  datastorage: any;
  file: any;
  ref: any;
  fileUrl: string = "";
  fileName: string = "";
  messaggioID: string = "";
  id_utente: string;
  allegati: any = [];

  constructor(
    private toastCtrl: ToastController,
    private accessProviders: AccessProviders,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private modalController: ModalController,
    private firebaseStorage: AngularFireStorage) { }

    ngOnInit() {
      this.storage.get('storage_xxx').then((res) => {
        this.datastorage = res;
        this.id_utente = this.datastorage.id;
      })
    }

  ionViewWillEnter() {
    this.allegati = [];
  }

  async loadMessages() {
    return new Promise(resolve => {
      let body = {
        request: "load_allegati",
        id_consulto: this.consulto_id,
      }

      this.accessProviders.postData(body, 'process_db.php').subscribe((res: any) => {
        for (let datas of res.result) {
          this.allegati.push(datas);
        }
        resolve(true);
      })
    })
  }

  selectFile() {
    this.file = (<HTMLInputElement>document.getElementById("file")).files[0];
  }

  async uploadFileToFirebaseStorage() {
    const loader = await this.loadingCtrl.create({
      message: "Caricamento allegato..."
    });
    loader.present();

    let ref = this.firebaseStorage.ref('file/' + this.file.name);
    ref.put(this.file).then(() => {
      ref.getDownloadURL().subscribe(url => {
        this.fileUrl = url;
        this.fileName = this.file.name;
      })
    }).then(() => {
      loader.dismiss();
    })
      .catch(e => {
        console.log(e);
      })
  }

  async uploadAllegatoToDB() {
    this.generateID();
    const loader = await this.loadingCtrl.create({
      message: "Invio..."
    });
    loader.present();

    return new Promise(resolve => {
      let body = {
        request: "send_message",
        id_messaggio: this.messaggioID,
        id_consulto: this.consulto_id,
        id_utente: this.id_utente,
        testo: this.fileName,
      }

      this.accessProviders.postData(body, 'process_db.php').subscribe((res: any) => {
        if (res.success == true) {
          loader.dismiss();
          resolve(true);
        }
        else {
          loader.dismiss();
          this.presentToast(res.msg);
        }
      })

      this.ionViewWillEnter();
    });
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
