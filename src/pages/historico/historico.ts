import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { IotdataProvider } from '../../providers/iotdata/iotdata';


import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html',
})
export class HistoricoPage {
  @ViewChild(BaseChartDirective) 
    public chart: BaseChartDirective; // Now you can reference your chart via `this.chart`
  tag_id:any;
  label:any;
  horas:number=0;
  desde="";
  hasta="";
  dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];


  constructor(public navCtrl: NavController,
    private _sdProvider: IotdataProvider,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private platf:Platform) {
    this.tag_id = this.navParams.get('tag_id');
    this.label = this.navParams.get('label');
    console.log("tag: "+this.tag_id+" titulo: "+this.label);
  }


  // lineChart
  public lineChartData:Array<any> = [
    {
      data: [
      {x:0, y:0},
      {x:5, y:0},
      {x:10, y:0},
      {x:15, y:0},
      {x:20, y:0},
      {x:25, y:0},
      {x:30, y:0}
    ]}
  ];
  //public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];




  public lineChartOptions:any = {
    scales: {
            xAxes: [{
              time: {
                unit:'minute'
                },
                type: 'time',
                distribution: 'series',
                position: 'bottom'
            }],
            yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
        },
        responsive:true,
        legend: {
            display: false
          }

  };

  convertirFecha(fecha:string){
    let d = new Date(fecha);
    return this.dias[d.getDay()]+" "+d.getDate();
  }

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  showAlert( mensaje ) {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: mensaje,
      buttons: ['ACEPTAR']
    });
    alert.present();
  }

  adelante(){
    this.horas -= 5;
    if (this.horas < 0)
      this.horas = 0;
    this._sdProvider.getHistoricoAnterior(this.tag_id, this.horas)
        .map( resp => resp.json() )
        .subscribe(data => {          
          console.log("data: "+data); 
          if (data.data.length > 0 )
          {
            this.lineChartData = data.data;
            this.desde = this.convertirFecha(data.antes);
            this.hasta = this.convertirFecha(data.ahora);
            this.chart.chart.update();
          }else{
            this.showAlert("No hay datos disponibles");
          }
          
        });
  }

  atras(){
    this.horas += 5;
    this._sdProvider.getHistoricoAnterior(this.tag_id, this.horas)
        .map( resp => resp.json() )
        .subscribe(data => {
          console.log("data: "+data);
          console.log("tamaño: "+data.data.length)
          if (data.data.length > 0)
          {
            this.lineChartData = data.data;
            this.desde = this.convertirFecha(data.antes);
            this.hasta = this.convertirFecha(data.ahora);
            this.chart.chart.update();
          }else{
            this.showAlert("No hay datos disponibles");
          }
          
        });
  }

ngOnInit(){
  console.log("obteniendo histórico");
  this._sdProvider.getHistorico(this.tag_id)
  .map( resp => resp.json() )
  .subscribe(data => {
    console.log("data: "+data); 
    if(data.data.length > 0)
    {      
      this.lineChartData = data.data;
      this.desde = this.convertirFecha(data.antes);
            this.hasta = this.convertirFecha(data.ahora);
    }else{
      this.showAlert("No hay datos disponibles");
    }
  });
}



}