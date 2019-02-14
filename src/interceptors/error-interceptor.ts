import { StorageService } from './../services/storage.services';

import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";

/*
Classe que implementa um metodo que faz interceptar uma requisição, e aplica uma logica.
*/
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage : StorageService) {
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        
        
        console.log("Passou pelo Interceptor");
        return next.handle(req)
        .catch((error,caught) => {
            let errorObj = error;

            if(errorObj.error) {
                errorObj = errorObj.error;
            }

            // convertendo texto para o formato JSON
            if(!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor: ");
            console.log(errorObj);

            switch (errorObj.status) {
                case 403:
                this.handle403();
                break;
            }

            return Observable.throw(errorObj);
        }) as any;
    }
// Tratando erro 403: Limpando o Local Storage, do usuario invalido
    handle403() {
        this.storage.setLocalUser(null);

    }
}
/*
- Exigência para criar um interceptor
*/
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};