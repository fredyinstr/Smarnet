import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Módulos
import { JustgageModule  } from "angular2-justgage";
import { GaugeComponent } from '../components/gauge/gauge';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { AvatarModule } from 'ngx-avatar';
import { ChartsModule } from 'ng2-charts';

// Páginas
import { MyApp } from './app.component';
import {PanelsPage} from '../pages/panels/panels';
import { TabsPage } from '../pages/tabs/tabs';
import { MonitorPage } from '../pages/monitor/monitor';
import {LoginPage} from '../pages/login/login'
import { AddTagPage } from '../pages/add-tag/add-tag';
import { CrearcuentaPage } from '../pages/crearcuenta/crearcuenta';
import { HistoricoPage } from '../pages/historico/historico';
import { AddpanelPage } from '../pages/addpanel/addpanel';
import { DispositivosPage } from '../pages/dispositivos/dispositivos';
import { NuevodispositivoPage } from '../pages/nuevodispositivo/nuevodispositivo';
import { TagopcionesPage } from '../pages/tagopciones/tagopciones';


// Servicios
import { AjustesProvider } from '../providers/ajustes/ajustes';
import { IotdataProvider } from '../providers/iotdata/iotdata';
import { LoginProvider } from '../providers/login/login';

@NgModule({
  declarations: [
    MyApp,
    PanelsPage,
    TabsPage,
    MonitorPage,
    LoginPage,
    AddTagPage,
    CrearcuentaPage,
    HistoricoPage,
    AddpanelPage,
    DispositivosPage,
    NuevodispositivoPage,
    TagopcionesPage,
    GaugeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AvatarModule,
    JustgageModule,
    ChartsModule,
    // IonicModule.forRoot(MyApp,{
    //   backButtonText:'Atrás'
    // })
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PanelsPage,
    TabsPage,
    MonitorPage,
    LoginPage,
    CrearcuentaPage,
    HistoricoPage,
    AddTagPage,
    AddpanelPage,
    DispositivosPage,
    TagopcionesPage,
    NuevodispositivoPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AjustesProvider,
    IotdataProvider,
    LoginProvider
  ]
})
export class AppModule {}
