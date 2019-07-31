import { Component, Input } from '@angular/core';
import { IotdataProvider } from '../../providers/iotdata/iotdata';
import { Observable, Subject} from "rxjs";
import { ActionSheetController, NavController, AlertController } from 'ionic-angular';
import { HistoricoPage } from '../../pages/historico/historico';
import { ProgsemanalPage } from '../../pages/progsemanal/progsemanal';

@Component({
  selector: 'switch',
  templateUrl: 'switch.html'
})
export class SwitchComponent {
  @Input() options: any = {};

  private destroy = new Subject(); 

  text: string;
  btn_state:boolean = false;
  reporte: any;
  fecha: any;

  constructor(private iotDatap:IotdataProvider,
    public actionSheetController: ActionSheetController,
    private navCtrl: NavController,
    public alertCtrl: AlertController) {
    console.log('Hello SwitchComponent Component');
    this.text = 'Hello World';
  }

  async menuSheet(nombre) {
    const actionSheet = await this.actionSheetController.create(
      {
      title: nombre,
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


  retornaFecha(fecha){
    var meses = ['Ene', 'Feb', 'Mar', 'Abr','May','Jun', 'Jul','Ago','Sep', 'Oct','Nov','Dic'];
    var d = new Date(fecha);
    var hoy = new Date();
    
    var mes = meses[d.getMonth()];
    var dia = d.getDate();
    var mesdia = mes+" "+dia;
    if ((d.getMonth === hoy.getMonth)&&(d.getDate() === hoy.getDate()))
      mesdia = "Hoy";
    var minutes = d.getMinutes();     
    return mesdia +" "+d.getHours()+":"+String(minutes > 9 ? minutes : '0' + minutes);
  }

  historico(tag_id, title){
    this.navCtrl.push(HistoricoPage, { 'tag_id':tag_id, 'label':title });
  }
  progSemanal(tag_id){
    this.navCtrl.push(ProgsemanalPage, { 'tag_id':tag_id });
  }

  notificaciones(){
    const alert = this.alertCtrl.create({
      title: 'Próximamente!',
      subTitle: 'El servicio de notificaciones estará disponible próximamente',
      buttons: ['OK']
    });
    alert.present();
  }

  onChange(event){
    console.log(event);
    console.log("data",this.options.tag_id, event);
    this.iotDatap.digitalSensorData(this.options.tag_id, event)
                 .map( resp => resp.json() )
                 .subscribe( data=>{
                   //console.log(data);
                   if (data.error){
                     console.error("Error");
                   }else{
                     console.log(data);
                   }
                 })
  }

  ngOnInit(){
    console.log("switch tag id: ", this.options.tag_id);
    this.iotDatap.datatag(this.options.tag_id)
          .map( resp => resp.json() )
          .subscribe( data=>{
            this.reporte = data;
            console.log(data);
            if( data.error ){
              //problema
            }else{
              this.btn_state = ( data.datatag.sensordata_valor == "1.00" ) ? true : false;
                   console.log ("Switch valor: ",this.btn_state);
                   this.fecha = this.retornaFecha(data.datatag.sensordata_fecha_hora);
            }
          });


          Observable.interval(20000).takeUntil(this.destroy)
          .subscribe(
            ()=>{
              console.log("switch tag id: ", this.options.tag_id);
              this.iotDatap.datatag(this.options.tag_id)
              .map( resp => resp.json() )
              .subscribe( data=>{
                this.reporte = data;
                console.log(data);
                if( data.error ){
                  //problema
                }else{
                   
                   this.btn_state = ( data.datatag.sensordata_valor == "1.00" ) ? true : false;
                   console.log ("Switch valor: ",this.btn_state);
                   this.fecha = this.retornaFecha(data.datatag.sensordata_fecha_hora);
                }
              })
            })



        }


        ngOnDestroy(): void {
          //Called once, before the instance is destroyed.
          //Add 'implements OnDestroy' to the class.
          console.log("Eliminando interval observable...");
          this.destroy.next();
        }

}
