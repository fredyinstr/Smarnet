import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginProvider } from '../../providers/login/login';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-crearcuenta',
  templateUrl: 'crearcuenta.html',
})
export class CrearcuentaPage implements OnInit {

  signupform: FormGroup;
  userData = { "username": "", "password": "", "email": "", "name": "" };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private loginprovider: LoginProvider,
              public alertCtrl: AlertController) {
  }

  showAlert( mensaje, tipo ) {
    let alert = this.alertCtrl.create({
      title: tipo,
      subTitle: mensaje,
      buttons: ['ACEPTAR']
    });
    alert.present();
  }

  crearCuenta(){
    console.log("Creando cuenta...",this.userData);
    this.loginprovider.crear_cuenta(this.userData.name, 
                                    this.userData.username, 
                                    this.userData.password, 
                                    this.userData.email)
                      .subscribe(res => {
                      let respuesta = res.json();
                      console.log(respuesta);
                        if( !respuesta.error)
                        {
                          this.showAlert(respuesta.mensaje, "OK!");
                          console.log("Usuario creado", respuesta.mensaje);
                          
                          this.navCtrl.setRoot( LoginPage );
                      }else{
                          this.showAlert(respuesta.mensaje, "Error!");
                          console.log('Respuesta login: ', respuesta);
                        }
                      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearcuentaPage');
  }


  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signupform = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    });
  }

}
