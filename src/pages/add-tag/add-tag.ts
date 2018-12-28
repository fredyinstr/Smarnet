import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { IotdataProvider } from '../../providers/iotdata/iotdata';
import { TagopcionesPage } from '../tagopciones/tagopciones';
import { PanelsPage } from '../panels/panels';



@Component({
  selector: 'page-add-tag',
  templateUrl: 'add-tag.html',
})
export class AddTagPage {
  panel_id:any;
  serialDispositivo = "";
  tags:any;
  msgError = "";

  options = {
    min: 0,
    title: 'titulo',
    counter: true
  };
  max = 100;
  valor = Math.random()*100;

  dispositivos:any = [
    {
      'serial':'FQV02001',
      'tags':[
        {'nombre':'Temperatura', 'tag_id':'13'},
        {'nombre':'Oxígeno', 'tag_id':'10'},
        {'nombre':'Saturación', 'tag_id':'12'},
        {'nombre':'PH', 'tag_id':'11'}
      ]
    },
    {
      'serial':'FQV02002',
      'tags':[
        {'nombre':'Temperatura', 'tag_id':'18'},
        {'nombre':'Oxígeno', 'tag_id':'19'},
        {'nombre':'Saturación', 'tag_id':'20'},
        {'nombre':'PH', 'tag_id':'21'}
      ]
    }
  ]

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private iotdatap: IotdataProvider,
              public alertCtrl: AlertController) {
    this.panel_id = this.navParams.get('panel_id');
  }

  irAhome(){
    this.navCtrl.setRoot(PanelsPage);
  }

  buscarTags(){
    if(this.serialDispositivo === "")
    {
      this.msgError = "Debe ingresar un serial";
      return;
    }
    this.msgError = "";
    console.log("Buscando tags...");
      this.iotdatap.tagsfromserial(this.serialDispositivo)
                    .subscribe(res=>{
                      let respuesta = res.json();
                      if(respuesta.error){
                        console.error("Error: ",respuesta.mensaje);
                        const alert = this.alertCtrl.create({
                          title: 'Error!',
                          subTitle: respuesta.mensaje,
                          buttons: ['Aceptar']
                        });
                        alert.present()
                      }else{
                        this.tags = respuesta.tags;
                        console.log("Respuesta: ", respuesta)
                      }
                    })
  }

  agregar(tag, nombre){    
    this.navCtrl.push(TagopcionesPage, {'panel_id':this.panel_id, 'tag_id':tag, 'tag_nombre':nombre});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTagPage');
  }

}
