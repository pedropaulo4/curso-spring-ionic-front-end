import { EstadoDTO } from './../../models/estado.dto';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class EstadoService {
/*
    HttpClient faz as requisições no Back-end
    

*/
    constructor(public http: HttpClient) {

    }
    /*
    Função tipada que retorna uma lista de categoria DTO
    */

    findAll() : Observable<EstadoDTO[]> {
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
    }
}