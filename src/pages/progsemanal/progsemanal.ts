//import { ProgsemanalPage } from './progsemanal';
import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { IotdataProvider } from '../../providers/iotdata/iotdata';



@Component({
  selector: 'page-progsemanal',
  templateUrl: 'progsemanal.html',
})
export class ProgsemanalPage {

  formulario: FormGroup;
  tag:any;

  programacion: any =
    {
      prog:true,
      luneson:"08:30",
      lunesoff:"18:30",
      marteson:"08:30",
      martesoff:"18:30",
      miercoleson:"08:30",
      miercolesoff:"18:30",
      jueveson:"08:30",
      juevesoff:"18:30",
      vierneson:"08:30",
      viernesoff:"18:30",
      sabadoon:"08:30",
      sabadooff:"18:30",
      domingoon:"08:30",
      domingooff:"18:30",
    }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private iotdata: IotdataProvider,
              public alertCtrl: AlertController) {
      this.tag = navParams.get("tag_id");
  }

 

  enviarProgramacion(){
    console.log(this.formulario.value);
    this.iotdata.actualizarTagSettings(this.tag, this.programacion)
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
          subTitle: respuesta.mensaje,
          buttons: ['OK']
        });
        alert.present();
      }
    })
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgsemanalPage');
    this.iotdata.obtenerSettings(this.tag)
                .map( resp=>resp.json())
                .subscribe( data=>{
                  if (data.error){
                  // Tenemos problemas
                  console.log('HUBO UN PROBLEMA AL CARGAR');
                  }else{
                    if (data.programacion.prog == 1){
                      data.programacion.prog =true;
                    }else{
                      data.programacion.prog=false;
                    }
                    this.programacion = data.programacion;
                    console.log('Programación: ', this.programacion);
                  }
                });
  }

  ngOnInit(): void {
    this.formulario= new FormGroup({
      prog: new FormControl(),
      luneson: new FormControl(),
      lunesoff: new FormControl(),
      marteson: new FormControl(),
      martesoff: new FormControl(),
      miercoleson: new FormControl(),
      miercolesoff: new FormControl(),
      jueveson: new FormControl(),
      juevesoff: new FormControl(),
      vierneson: new FormControl(),
      viernesoff: new FormControl(),
      sabadoon: new FormControl(),
      sabadooff: new FormControl(),
      domingoon: new FormControl(),
      domingooff: new FormControl()
    });
    
  }

}
