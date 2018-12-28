import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AjustesProvider } from '../providers/ajustes/ajustes';


import { TabsPage } from '../pages/tabs/tabs';
import { PanelsPage } from '../pages/panels/panels';
import { LoginPage } from '../pages/login/login';
import { DispositivosPage } from './../pages/dispositivos/dispositivos';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsp = TabsPage;
  loginp = LoginPage;
  panelsp = PanelsPage;
  rootPage:any;
  dispositivos = DispositivosPage;

  ajustesp:any;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private _ajustes: AjustesProvider,
              private menuCtrl:MenuController) {
    this.ajustesp = _ajustes;
    platform.ready().then(() => {
         

      this._ajustes.cargar_storage()
                    .then( ()=>{
                      if ( _ajustes.ajustes.logueado ){
                        // Muestra Panels
                        this.rootPage = PanelsPage;
                        console.log ("cambio a panelpage");
                      }else{
                        // Muestra página principal
                         this.rootPage = LoginPage;
                         console.log ("cambio a loginpage");
                      }
                      statusBar.styleDefault();
                      splashScreen.hide();
                    })

      
    });
  }

  irApagina(pagina:any){
    this.rootPage = pagina;
    console.log("Cambiando a ",pagina);
    this.menuCtrl.close();
  }

  irAdispositivos(){
    this.irApagina(DispositivosPage);
  }
  irApanels(){
    this.irApagina(TabsPage);
  }

  cerrarSesion(){   
    this._ajustes.ajustes.logueado = false;
    this._ajustes.guardar_storage();
    this.irApagina(this.loginp);
        
  }

  
}

