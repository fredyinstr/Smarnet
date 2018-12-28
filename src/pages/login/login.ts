import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { AjustesProvider } from '../../providers/ajustes/ajustes';
import { PanelsPage } from '../panels/panels';
import { CrearcuentaPage } from '../crearcuenta/crearcuenta';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

 

  user:any = "";
  pass:any = "";
  usuario_id:any = "";
  usuario_nick:any = "";
  estadoSesion:boolean = true;//si el usuario selecciona check mantener sesion
  ensesion:any=false;//Esta en sesion actualmente

  constructor(public navCtrl: NavController, 
              private loginprovider:LoginProvider,
              private _ajustes: AjustesProvider,
              public navParams: NavParams,
              public alertCtrl: AlertController) {
  }

  showAlert( mensaje ) {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: mensaje,
      buttons: ['ACEPTAR']
    });
    alert.present();
  }

  autenticar(){
    this.loginprovider.login(this.user, this.pass, this.estadoSesion)
    .subscribe(res => {
    let respuesta = res.json();
    console.log(respuesta);
      if( !respuesta.error)
      {
        console.log("Respuesta autenticación: usuario: "+respuesta.usuario_id+" nick: "+respuesta.usuario_nick);
        this.usuario_id = respuesta.usuario_id;
        this.usuario_nick = respuesta.usuario_nick;
        this._ajustes.ajustes.usuario_id = this.usuario_id;
        this._ajustes.ajustes.usuario_nick = this.usuario_nick;
        this._ajustes.ajustes.logueado = true;
        this._ajustes.guardar_storage();
        this.navCtrl.setRoot( PanelsPage, {"usuario_id":this.usuario_id, "usuario_nick":this.usuario_nick} );
    }else{
        this.showAlert(respuesta.mensaje);
        console.log('Respuesta login: ', respuesta.mensaje);
      }
    });
  }

  crearCuenta(){
    this.navCtrl.push(CrearcuentaPage);
  }


  ngOnInit() {   

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.user = this._ajustes.ajustes.usuario_nick;
  }

}
