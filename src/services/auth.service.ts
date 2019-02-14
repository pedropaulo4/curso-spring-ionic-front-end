import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.services';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
// Objeto para extrair o token
    jwtHelper : JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, public storage: StorageService){

    }


    authenticate(creds : CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }
/*
Passo o token como parametro obtido no HEADER
SubString(7): Recorto a String a partir do 7º caracter
*/
    sucessfulLogin(authorizationValue : string) {
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };

        this.storage.setLocalUser(user);



    }

    logout(){
        this.storage.setLocalUser(null);
    }

   
}