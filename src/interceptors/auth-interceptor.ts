import { API_CONFIG } from './../config/api.config';

import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.services";

/*
Classe que implementa um metodo que faz interceptar uma requisição, e aplica uma logica.
*/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {

    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // repassa a requisição
        let localUser = this.storage.getLocalUser();

        let n = API_CONFIG.baseUrl.length;
        let requestToApi = req.url.substring(0, n) == API_CONFIG.baseUrl;
        

        if (localUser && requestToApi) {
           // Clonando a requisição original, e adcionando o cabeçalho
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        }
        else {
            return next.handle(req);
        }
        
       
        }
    }

/*
- Exigência para criar um interceptor
*/
export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};