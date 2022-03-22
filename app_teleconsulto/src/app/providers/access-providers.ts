import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class AccessProviders {

    // url backend api json
    server: string = 'https://mony-legends.000webhostapp.com/db/';

    constructor(
        public http: HttpClient
    ) { }

    postData(body, file) {
        let headers = new HttpHeaders()
            .set('Accept', '*/*')
            .set('Content-Type', 'text/plain');

        let options = {
            headers: headers
        }

        return this.http.post(this.server + file + ".php", JSON.stringify(body), options)
            .timeout(59000) // 59s timeout
            .map(res => res);
    }
}