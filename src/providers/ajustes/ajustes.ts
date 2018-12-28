import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

@Injectable()
export class AjustesProvider {

  ajustes = {
    mostrar_tutorial: true,
    logueado:false,
    usuario_id: "",
    usuario_nick: ""
  }

  constructor( private platform: Platform,
               public storage: Storage ) {
    this.cargar_storage();
  }

  cargar_storage(){
    
    console.log('Cargando Storage...');
    let promesa = new Promise( (resolve, reject )=>{
      
      if ( this.platform.is( "cordova" )){
        //Estamos en el dispositivo
        this.storage.ready()
                    .then( ()=>{

                      this.storage.get("ajustes")
                          .then(ajustes=>{
                            if (ajustes){
                              console.log("Ajustes cargado", ajustes.logueado);
                              this.ajustes = ajustes;
                            }
                            resolve();
                          });
                    })

      }else{
        // Estamos en navegador
        if (localStorage.getItem( "ajustes" ) ) {
            this.ajustes = JSON.parse ( localStorage.getItem( "ajustes" ) );
            console.log("Ajustes cargado ", this.ajustes.logueado);
        }

        resolve();
      }

    });
    return promesa;

  }

  guardar_storage() {
      if ( this.platform.is( "cordova" )){
        //Estamos en el dispositivo
        this.storage.ready()
            .then( ()=>{
              console.log("guardando ajustes", this.ajustes);
              this.storage.set("ajustes", this.ajustes );
            });

      }else{
        // Estamos en navegador
        console.log("Guardando ajustes ", this.ajustes)
        localStorage.setItem( "ajustes", JSON.stringify(this.ajustes) );
      }
  }

}
