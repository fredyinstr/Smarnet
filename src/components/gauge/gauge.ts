import { Component, Input, OnInit  } from '@angular/core';
import { Observable, Subject} from "rxjs";
import { IotdataProvider } from '../../providers/iotdata/iotdata';



@Component({
  selector: 'gauge',
  templateUrl: 'gauge.html'
})
export class GaugeComponent implements OnInit  {

  @Input() options: any = {};
  @Input() max: number;
  @Input() value: number;

  private destroy = new Subject(); 

  text: string;

  titulo: any;

  intervalo: any;
  reporte: any;
  fecha: any;

  constructor(private dataprovider: IotdataProvider) {
    console.log('Hello GaugeComponent Component');
    this.text = 'Hello World';
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
    return mesdia +" "+d.getHours()+":"+String(minutes > 9 ? minutes : '0' + minutes); ;

  }

  ngOnInit(){
    this.dataprovider.datatag(this.options.tag_id)
          .map( resp => resp.json() )
          .subscribe( data=>{
            this.reporte = data;
            console.log(data);
            if( data.error ){
              //problema
            }else{
              this.value = data.datatag.sensordata_valor;
              this.fecha = this.retornaFecha(data.datatag.sensordata_fecha_hora);
            }
          });



      Observable.interval(20000).takeUntil(this.destroy)
      .subscribe(
        ()=>{
          this.dataprovider.datatag(this.options.tag_id)
          .map( resp => resp.json() )
          .subscribe( data=>{
            this.reporte = data;
            console.log(data);
            if( data.error ){
              //problema
            }else{
              this.value = data.datatag.sensordata_valor;
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
