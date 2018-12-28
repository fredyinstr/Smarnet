import { Http, Response, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';
// import { AjustesProvider } from '../ajustes/ajustes';

@Injectable()
export class LoginProvider {

  constructor(public http: Http) {
    console.log('Hello LoginProvider Provider');
  }

  login(user:any, pass:any, ensesion:any) {
    console.log("autenticando: "+ensesion);
    //let parametros = {"usuario":user, "password":pass, "ensesion":ensesion};
    let url = URL_SERVICIOS + "iotlogin/autenticar";
    let data = new URLSearchParams();
    data.append('usuario', user);
    data.append('password', pass);
    data.append('ensesion', ensesion);
    return this.http.post(url, data);
  }

  crear_cuenta(nombre:any, user:any, pass:any, mail:any){
    console.log("Creando cuenta");

    let url = URL_SERVICIOS + "iotlogin/crearcuenta";
    let data = new URLSearchParams();
    data.append('usuario', user);
    data.append('password', pass);
    data.append('nombre', nombre);
    data.append('correo', mail);
    return this.http.post(url, data);

  }

}
