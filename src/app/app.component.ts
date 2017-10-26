import { Component, OnInit } from '@angular/core';
import { DualListModule } from './dual-list/dual-list.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  customFnAscBnd = this.customFnAsc.bind(this);
  customFnDescBnd = this.customFnDesc.bind(this);

  customFnAsc(n1, n2): number {
    if (n1 && n2) {
      const retVal = JSON.stringify(n1.value.email) > JSON.stringify(n2.value.email) ? 1 :
       JSON.stringify(n1.value.email) < JSON.stringify(n2.value.email) ? -1 : 0;
      return retVal;
    } else {
      return 0;
    }
  }

  customFnDesc(n1, n2): number {
    if (n1 && n2) {
      const retVal = JSON.stringify(n1.value.email) > JSON.stringify(n2.value.email) ? -1 :
       JSON.stringify(n1.value.email) < JSON.stringify(n2.value.email) ? 1 : 0;
      return retVal;
    } else {
      return 0;
    }
  }

  constructor() {}
  ngInit() {
  }
}
