import { CategoriaDTO } from './../../models/categoria.dto';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CategoriaService {
/*
    HttpClient faz as requisições no Back-end
    

*/
    constructor(public http: HttpClient) {

    }
    /*
    Função tipada que retorna uma lista de categoria DTO
    */

    findAll() : Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}