import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, MenuController} from 'ionic-angular';
import { IotdataProvider } from '../../providers/iotdata/iotdata';
import { MonitorPage } from '../monitor/monitor';
import { AjustesProvider } from '../../providers/ajustes/ajustes';
import { LoginPage } from '../login/login';
import { AddpanelPage } from '../addpanel/addpanel';


@Component({
  selector: 'page-panels',
  templateUrl: 'panels.html',
})
export class PanelsPage {

  usuario_nick = "Invitado";
  usuario_id:any;

  ajustesp: AjustesProvider;
  iotDatap: IotdataProvider;

  paneles:any[] = [];
  loading:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _iotdata: IotdataProvider,
              private ajustes: AjustesProvider,
              public loadingCtrl: LoadingController,
              private menuCtrl: MenuController) { 
    this.ajustesp = this.ajustes;
    this.iotDatap = this._iotdata;
    

    this.cargando();
    // this.ajustes.cargar_storage()
    //                 .then( ()=>{
    //                   if ( ajustes.ajustes.logueado ){
    //                     // Muestra Panels
    //                     console.log("Está logueado");
    //                     this.loading.dismiss();
    //                   }else{
    //                     console.log("No está logueado");
    //                     this.loading.dismiss();
    //                     this.navCtrl.setRoot(LoginPage);
    //                   }
                        
    //                 });
    if (!this.ajustes.ajustes.logueado)
    {
      console.log("No está logueado");
      this.loading.dismiss();
      this.navCtrl.setRoot(LoginPage);
    }else{
      console.log("Está logueado");
      this.loading.dismiss();
    }
    
  }

  
  // Spinner cargando...
  cargando() {
     this.loading = this.loadingCtrl.create({      
      content: 'Cargando...'
    });
  
    this.loading.present();
  }


  seleccionado(panel, id){
    console.log ('Ventana seleccionada', panel);
    this.navCtrl.setRoot( MonitorPage, {'titulo':panel, 'panel_id':id} );
  }

  actualizar(){
    this._iotdata.obtenerPaneles(this.ajustes.ajustes.usuario_id);    
  }

  mostrar_tuto(mostrar:boolean){
    this.ajustes.ajustes.mostrar_tutorial = mostrar;
    this.ajustes.guardar_storage();
  }

  mostrarMenu(){
    this.menuCtrl.toggle();
  }

  ionViewDidLoad() {
    // if ( this.navParams.get('usuario_nick')){
    //   this.usuario = this.navParams.get('usuario_nick');
    // }
    //this._iotdata.obtenerPaneles(1);
  }

  nuevoPanel(){
    this.navCtrl.push(AddpanelPage, {'usuario_id': this.ajustes.ajustes.usuario_id});
  }

  ionViewDidEnter(){
    console.log('Entrando a panels');
    this.cargando();
    this._iotdata.obtenerPaneles(this.ajustes.ajustes.usuario_id)
                .map( resp=>resp.json())
                                .subscribe( data=>{
                                  if (data.error){
                                  // Tenemos problemas
                                  console.log('HUBO UN PROBLEMA AL CARGAR');
                                  this.loading.dismiss();
                                  }else{
                                    this.paneles = data.paneles;
                                    console.log('paneles desde panels: ', this.paneles);
                                    this.loading.dismiss();
                                  }
                                });
                  
  }

}
