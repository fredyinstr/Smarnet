import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AjustesProvider } from '../../providers/ajustes/ajustes';
import { IotdataProvider } from '../../providers/iotdata/iotdata';
import { AddTagPage } from '../add-tag/add-tag';
import { HistoricoPage } from '../historico/historico';
import { PanelsPage } from '../panels/panels';




@Component({
  selector: 'page-monitor',
  templateUrl: 'monitor.html',
})
export class MonitorPage {

  titulo = "";
  panel_id = "";
  mostrar:any;
  iotDatap : IotdataProvider;
  public press: number = 0;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private ajustes: AjustesProvider,
              private iotData: IotdataProvider,
              private alertCtrl: AlertController) {
    this.iotDatap = this.iotData;
    console.log(navParams);
    this.titulo = this.navParams.get('titulo');
    this.panel_id = this.navParams.get('panel_id');
    this.iotData.obtenerTags(this.panel_id);
                


    this.ajustes.cargar_storage()
                .then( ()=>{
                  this.mostrar = this.ajustes.ajustes.mostrar_tutorial;
                });
    
  }

  regresar(){
    this.navCtrl.setRoot(PanelsPage);
  }

  agregarTag(){
    this.navCtrl.setRoot(AddTagPage, { 'panel_id':this.panel_id });
  }

  historico(tag_id, title){
    this.navCtrl.push(HistoricoPage, { 'tag_id':tag_id, 'label':title })
  }


  eliminarPanel(){
    const confirm = this.alertCtrl.create({
      title: 'Reamente desea eliminar el Panel?',
      message: 'El panel se eliminará definitivamente',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Eliminando panel');
            this.iotData.eliminarpanel(this.panel_id)
                        .subscribe( res=>{
                          let respuesta = res.json();
                          if (respuesta.error){
                            const alert = this.alertCtrl.create({
                              title: 'Atención!',
                              subTitle: respuesta.mensaje,
                              buttons: ['OK']
                            });
                            alert.present();
                          }else{
                            const alert = this.alertCtrl.create({
                              title: 'OK!',
                              subTitle: 'El panel se eliminó satisfactoriamente',
                              buttons: [{
                                text: 'OK',
                                handler: () => {
                                  this.navCtrl.setRoot(PanelsPage);
                                }
                              }]
                            });
                            alert.present();
                          }
                        })
          }
        }
      ]
    });
    confirm.present();

  }



  eliminarTag(tag){
    const confirm = this.alertCtrl.create({
      title: 'Reamente desea eliminar el Tag?',
      message: 'El tag se eliminará definitivamente de este panel',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Eliminando tag');
            this.iotData.eliminartagpanel(this.panel_id, tag)
                        .subscribe( res=>{
                          let respuesta = res.json();
                          if (respuesta.error){
                            const alert = this.alertCtrl.create({
                              title: 'Atención!',
                              subTitle: respuesta.mensaje,
                              buttons: ['OK']
                            });
                            alert.present();
                          }else{
                            const alert = this.alertCtrl.create({
                              title: 'OK!',
                              subTitle: 'El tag se eliminó satisfactoriamente',
                              buttons: [{
                                text: 'OK',
                                handler: () => {
                                  this.iotData.obtenerTags(this.panel_id);
                                }
                              }]
                            });
                            alert.present();
                          }
                        })
          }
        }
      ]
    });
    confirm.present();

  }

  editarTag(tag){
    const alert = this.alertCtrl.create({
      title: 'Próximamente!',
      subTitle: 'Editar tag estará disponible próximamente',
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MonitorPage');
  }  

}
