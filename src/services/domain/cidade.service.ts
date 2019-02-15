
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { CidadeDTO } from '../../models/cidade.dto';

@Injectable()
export class CidadeService {
/*
    HttpClient faz as requisições no Back-end
    

*/
    constructor(public http: HttpClient) {

    }
    /*
    Função tipada que retorna uma lista de categoria DTO
    */

    findAll(estadoId : string) : Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estadoId}/cidades`);
    }
}