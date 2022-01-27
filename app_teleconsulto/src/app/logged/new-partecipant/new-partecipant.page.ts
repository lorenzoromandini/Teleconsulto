import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Medico } from 'src/app/models/medico';
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

  constructor(
    private router: Router,
    private accessProviders: AccessProviders
  ) { }

  async searchPartecipants() {
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
