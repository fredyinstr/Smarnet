import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IotdataProvider } from '../../providers/iotdata/iotdata';


@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html',
})
export class NotificacionesPage {
  titulo:string = "";
  tag_id:any;
  alertas:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private dataprovider: IotdataProvider) {
    this.titulo = this.navParams.get('titulo');
    this.tag_id = this.navParams.get('tag_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionesPage');
    // Obtener notificaciones
    this.dataprovider.obtenerNotificaciones(this.tag_id)
          .map( resp => resp.json() )
          .subscribe( data=>{
            if( data.error ){
              //problema
            }else{              
            this.alertas = data.notificaciones;
            console.log(data);
            }
          });
  }

}
