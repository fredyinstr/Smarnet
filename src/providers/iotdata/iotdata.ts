import { Http, Response, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class IotdataProvider {

  paneles:any[] = [];
  options:any[] = [];

  constructor(public http: Http) {
    console.log('Hello IotdataProvider Provider');
    //this.obtenerPaneles(1);
  }

  getHistorico(tag:any):Observable<Response> {
    let url = URL_SERVICIOS + "iotdata/historico/"+tag;
    return this.http.get(url);
  }

  getHistoricoAnterior(tag:any, horas:number):Observable<Response> {
    let url = URL_SERVICIOS + "iotdata/historicoAnterior/"+tag+'/'+horas;
    return this.http.get(url);
  }

  public obtenerPaneles(usuario){
   

      let url = URL_SERVICIOS + "iotdata/paneles/"+usuario;
      return this.http.get( url )
                  .map( resp=>resp.json())
                    .subscribe( data=>{
                      if (data.error){
                      // Tenemos problemas
                      console.log('HUBO UN PROBLEMA AL CARGAR');
                      }else{
                        this.paneles = data.paneles;
                        console.log('paneles desde service: ', this.paneles)
                      }
                    });
    
  }

  eliminarpanel(panel:any):Observable<Response> {
    let url = URL_SERVICIOS + "iotdata/eliminarpanel/"+panel;
    return this.http.get(url);
  }

  eliminartagpanel(panel:any, tag:any):Observable<Response> {
    let url = URL_SERVICIOS + "iotdata/eliminartagpanel/"+panel+'/'+tag;
    return this.http.get(url);
  }

  public obtenerTags(panel){

    let url = URL_SERVICIOS + "iotdata/tags/" + panel;
      return this.http.get( url )
                  .map( resp=>resp.json())
                    .subscribe( data=>{
                      if (data.error){
                      // Tenemos problemas
                      console.log('HUBO UN PROBLEMA AL CARGAR');
                      }else{
                        this.options = data.options;
                        console.log('tags desde service: ', this.options)
                      }
                    });

  }

  public datatag(tag){
    let url = URL_SERVICIOS + "iotdata/datatag/" + tag;
    return this.http.get(url);
  }

  public tagsfromserial(serial){
    let url = URL_SERVICIOS + "iotdata/tagsfromserial/" + serial;
    return this.http.get(url);
  }

  public crearPanel(usuario, nombrePanel){
    console.log("Creando panel");

    let url = URL_SERVICIOS + "iotdata/crearpanel";
    let data = new URLSearchParams();
    data.append('usuario', usuario);
    data.append('npanel', nombrePanel);    
    return this.http.post(url, data);
  }

  addTagToPanel(panel:any, tag:any, titulo:any, minimo:any, maximo:any, simbolo:any){
    let url = URL_SERVICIOS + "iotdata/addtagtopanel";
    let data = new URLSearchParams();
    data.append('panel', panel);
    data.append('tag', tag);   
    data.append('titulo', titulo);
    data.append('minimo', minimo);
    data.append('maximo', maximo);
    data.append('label', simbolo); 
    return this.http.post(url, data);
  }

}
