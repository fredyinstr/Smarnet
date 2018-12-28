import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { IotdataProvider } from '../../providers/iotdata/iotdata';


@Component({
  selector: 'page-tagopciones',
  templateUrl: 'tagopciones.html',
})
export class TagopcionesPage {
  panel_id:any;
  tag_id:any;
  tag_nombre:any;

  minimo=0;
  maximo=100;
  titulo='titulo';
  label='';

  options = {
    min: 0,
    title: this.titulo,
    label: this.label
  };
  max = 100;
  value = 25;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private iotDatap: IotdataProvider,
              public alertCtrl: AlertController) {

    this.panel_id = this.navParams.get('panel_id');
    this.tag_id = this.navParams.get('tag_id');
    this.tag_nombre = this.navParams.get('tag_nombre');
  }

  actualizar(){
    this.options = {
      min: this.minimo,
      title: this.titulo,
      label: this.label
    }
    this.max = this.maximo;
    this.value = Math.random()*this.max;
  }

  guardar(){
      console.log('Parámetros: ',this.panel_id, " - ", this.tag_id);
      this.iotDatap.addTagToPanel(this.panel_id, 
                                  this.tag_id, 
                                  this.titulo,
                                  this.minimo, 
                                  this.maximo,
                                  this.label)
                    .subscribe( res=>{
                      let respuesta = res.json();
                      if(respuesta.error){
                        const alert = this.alertCtrl.create({
                          title: 'Atención!',
                          subTitle: respuesta.mensaje,
                          buttons: ['OK']
                        });
                        alert.present();
                      }else{
                        const alert = this.alertCtrl.create({
                          title: 'Atención!',
                          subTitle: 'Tag adicionado satisfactoriamente',
                          buttons: ['OK']
                        });
                        alert.present();
                        this.navCtrl.pop();
                      }
                    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TagopcionesPage');
  }

 }
