import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-nuevodispositivo',
  templateUrl: 'nuevodispositivo.html',
})
export class NuevodispositivoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevodispositivoPage');
  }

}
