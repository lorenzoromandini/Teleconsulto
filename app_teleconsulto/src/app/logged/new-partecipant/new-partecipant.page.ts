import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';

@Component({
  selector: 'app-new-partecipant',
  templateUrl: './new-partecipant.page.html',
  styleUrls: ['./new-partecipant.page.scss'],
})
export class NewPartecipantPage {

  partecipantiSearchList: any = [];
  partecipante_cognome: string = "";
  partecipante_nome: string = "";
  partecipante_professione: string = "";
  consulto_id: string;
  partecipanti: any = [];

  constructor(
    private accessProviders: AccessProviders,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.consulto_id = JSON.parse(params["consulto_id"]);
    })
    this.route.queryParams.subscribe(params => {
      this.partecipanti = JSON.parse(params["partecipanti"]);
    })
  }

  async searchPartecipants() {
    this.partecipantiSearchList = [];
    return new Promise(resolve => {
      let body = {
        request: "search_partecipants",
        medico_cognome: this.partecipante_cognome,
        medico_nome: this.partecipante_nome,
        medico_professione: this.partecipante_professione
      }

      this.accessProviders.postData(body, 'process_db.php').subscribe((res: any) => {
        for (let datas of res.result) {
          this.partecipantiSearchList.push(datas);
        }
        this.checkPartecipante();
        resolve(true);
      })
    })
  }

  checkPartecipante() {
    for (var elementoLista of this.partecipantiSearchList) {
      for (var index of this.partecipanti) {
        if (elementoLista.id == index.medico_id) {
          elementoLista.boolPartecipante = true;
        }
      }
    }
  }

  async addPartecipante(medico_id: string) {
    const loader = await this.loadingCtrl.create({
      message: "Aggiunta partecipante..."
    });
    loader.present();

    return new Promise(resolve => {
      let body = {
        request: "add_partecipante",
        id_consulto: this.consulto_id,
        id_partecipante: medico_id,
        richiedente: "false",
      }

      this.accessProviders.postData(body, 'process_db.php').subscribe((res: any) => {
        if (res.success == true) {
          loader.dismiss();
          this.presentToast(res.msg);
          resolve(true);
        }
        else {
          loader.dismiss();
          this.presentToast(res.msg);
        }
      })
      this.navCtrl.back();
    });

  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 1500,
    });
    toast.present();
  }


}
