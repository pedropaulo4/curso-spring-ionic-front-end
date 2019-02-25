
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PedidoDTO } from '../../models/pedido.dto';


@Injectable()
export class PedidoService {
/*
    HttpClient faz as requisições no Back-end
    

*/
    constructor(public http: HttpClient) {

    }
    /*
    Função tipada que retorna uma lista de categoria DTO
    */

    insert(obj : PedidoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/pedidos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'

            }
        );
    }

  
}