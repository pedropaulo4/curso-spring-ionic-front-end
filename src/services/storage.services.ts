import { STORAGE_KEYS } from './../config/storage_keys.config';
import { Injectable } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { LocalUser } from '../models/local_user';

@Injectable()
export class StorageService {

     /*
    Obtendo o localUser
    */
    getLocalUser() : LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if(usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }

    /*
    Armazenando o localUser
    */
    setLocalUser(obj : LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }
}