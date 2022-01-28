import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';

@Component({
  selector: 'app-new-partecipant',
  templateUrl: './new-partecipant.page.html',
  styleUrls: ['./new-partecipant.page.scss'],
})
export class NewPartecipantPage {

  partecipanti: any = [];
  partecipante_cognome: string = "";
  partecipante_nome: string = "";
  partecipante_professione: string = "";
  consulto_id: string;

  constructor(
    private accessProviders: AccessProviders,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.consulto_id = JSON.parse(params["consulto_id"]);
      console.log(this.consulto_id);
    })
  }

  async searchPartecipants() {
    this.partecipanti = [];
    return new Promise(resolve => {
      let body = {
        request: "search_partecipants",
        medico_cognome: this.partecipante_cognome,
        medico_nome: this.partecipante_nome,
        medico_professione: this.partecipante_professione
      }

      this.accessProviders.postData(body, 'process_db.php').subscribe((res: any) => {
        for (let datas of res.result) {
          this.partecipanti.push(datas);
        }
        resolve(true);
      })
    })
  }

  async AddPartecipante(medico: any) {
    const loader = await this.loadingCtrl.create({
      message: "Aggiunta partecipante..."
    });
    loader.present();

    return new Promise(resolve => {
      let body = {
        request: "",
        id_consulto: this.consulto_id,
        id_utente: "",
        testo: "",
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
    });

  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 1500,
    });
    toast.present();
  }

  /*

  addPartecipante(partecipante: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        partecipante: JSON.stringify(partecipante),
      }
    };
    this.router.navigate(['/nuovo'], navigationExtras);
  }
  */


}
