import { FieldMessage } from './../models/fieldmessage';
import { StorageService } from './../services/storage.services';

import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { AlertController } from 'ionic-angular';

/*
Classe que implementa um metodo que faz interceptar uma requisição, e aplica uma logica.
*/
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage : StorageService, public alertControler : AlertController) {
        
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
                case 401:
                this.handle401();
                break;
                
                case 403:
                this.handle403();
                break;

                case 422:
                this.handle422(errorObj);
                break;

                default: 
                this.handleDefaultError(errorObj);
            }

            return Observable.throw(errorObj);
        }) as any;
    }
// Tratando erro 403: Limpando o Local Storage, do usuario invalido
    handle403() {
        this.storage.setLocalUser(null);

    }

    handle422(errorObj) {
        let alert = this.alertControler.create({
            title: 'Erro 422: Validação',
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false, // pra sair do alert, tocar apenas no botão do alert
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });

        alert.present();
    }
    

    handle401() {
        let alert = this.alertControler.create({
            title: 'Erro 401: Falha de Autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false, // pra sair do alert, tocar apenas no botão do alert
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });

        alert.present(); // mostrar o alert
    }

    handleDefaultError(errorObj) {
        let alert = this.alertControler.create({
            title: 'Erro' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false, // pra sair do alert, tocar apenas no botão do alert
            buttons: [
                {
                    text: 'Ok'
                }
            ]

        });
        alert.present();
    }

    listErrors(messages: FieldMessage[]): string {
        let s : string = '';
        for (var i=0; i<messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + '</strong><br>' + messages[i].message + '</p>';
        }

        return s;
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