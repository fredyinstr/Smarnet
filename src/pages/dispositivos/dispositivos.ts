import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PanelsPage } from '../panels/panels';

@Component({
  selector: 'page-dispositivos',
  templateUrl: 'dispositivos.html',
})
export class DispositivosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  irAhome(){
    this.navCtrl.setRoot(PanelsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DispositivosPage');
  }

}
