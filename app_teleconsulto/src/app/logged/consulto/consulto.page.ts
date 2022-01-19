import { Consulto } from '../../models/consulto';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllegatiComponent } from '../modals/allegati/allegati.component';
import { AddPartecipantsComponent } from '../modals/add-partecipants/add-partecipants.component';
import { Paziente } from '../../models/paziente';
import { ChatComponent } from '../modals/chat/chat.component';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';


@Component({
  selector: 'app-consulto',
  templateUrl: './consulto.page.html',
  styleUrls: ['./consulto.page.scss'],
})
export class ConsultoPage implements OnInit {

  partecipanti: any = [];
  consulto: any;
  paziente_nome: string;
  paziente_cognome: string;
  paziente_data_nascita: string;
  paziente_cf: string;
  oggetto: string;
  consulto_id: string;
  id_utente: string;

  constructor(
    private router: Router,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private accessProviders: AccessProviders
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.consulto = JSON.parse(params["consulto"]);
      this.consulto_id = this.consulto.id_consulto;
      this.paziente_nome = this.consulto.paziente_nome;
      this.paziente_cognome = this.consulto.paziente_cognome;
      this.paziente_cf = this.consulto.paziente_cf;
      this.paziente_data_nascita = this.consulto.paziente_data_nascita;
      this.oggetto = this.consulto.oggetto;
      console.log(this.consulto)
      this.loadPartecipanti();
    })
    this.route.queryParams.subscribe(params => {
      this.id_utente = JSON.parse(params["id_utente"]);
      console.log(this.id_utente)
    })
  }

  async loadPartecipanti() {
    return new Promise(resolve => {
      let body = {
        request: "load_partecipanti",
        id_consulto: this.consulto_id,
      }

      this.accessProviders.postData(body, 'process_db.php').subscribe((res: any) => {
        for (let datas of res.result) {
          this.partecipanti.push(datas);
        }
        resolve(true);
      })
    })
  }

  async openAddPartecipantModal() {
    const modal = await this.modalController.create({
      component: AddPartecipantsComponent
    });

    await modal.present();
  }

  async openAllegatiModal() {
    const modal = await this.modalController.create({
      component: AllegatiComponent
    });

    await modal.present();
  }

  openChat() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id_consulto: JSON.stringify(this.consulto_id),
        id_utente: JSON.stringify(this.id_utente)
      }
    };
    this.router.navigate(['/chat'], navigationExtras);
  }


}
