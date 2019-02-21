import { API_CONFIG } from './../../config/api.config';
import { ClienteDTO } from './../../models/cliente.dto';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage.services';

@Injectable()
export class ClienteService {
    constructor(public http: HttpClient, public storage: StorageService) {

    }

    findByEmail(email : string) {
             
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }
/*
Blob, porque a resposta é uma imagem
*/
    getImageFromBucket(id : String) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj : ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );

    }

}