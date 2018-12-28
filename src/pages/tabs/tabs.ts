import { Component } from '@angular/core';
import { MonitorPage } from '../monitor/monitor';
import { PanelsPage } from '../panels/panels';



@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1:any;
  tab2:any;

  constructor() {
    this.tab1 = PanelsPage;
    this.tab2 = MonitorPage;
  }

  

}
