import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { IotdataProvider } from '../../providers/iotdata/iotdata';

@Component({
  selector: 'page-addpanel',
  templateUrl: 'addpanel.html',
})
export class AddpanelPage {

  nombrePanel:String ="";
  usuario:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dataProvider: IotdataProvider,
              public alertCtrl: AlertController
   ) {
    this.usuario = this.navParams.get('usuario_id');
  }

  showAlert( mensaje, tipo ) {
    let alert = this.alertCtrl.create({
      title: tipo,
      subTitle: mensaje,
      buttons: ['ACEPTAR']
    });
    alert.present();
  }

  crearPanel(){
    this.dataProvider.crearPanel(this.usuario, this.nombrePanel)
        .subscribe(res=>{
          let respuesta = res.json();
          console.log("respuesta crear panel", respuesta);
          if (!respuesta.error){
            this.showAlert("Panel creado satisfactoriamente", "OK");
          }else{
            this.showAlert(respuesta.mensaje, "Error!");
          }
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpanelPage');
  }

}
