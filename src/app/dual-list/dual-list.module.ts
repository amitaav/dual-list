import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DuallistComponent } from './duallist.component';
import { ListpartComponent } from './listpart/listpart.component';
import { ListheaderComponent } from './listheader/listheader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  declarations: [
    DuallistComponent,
    ListpartComponent,
    ListheaderComponent
  ],
  exports: [
    DuallistComponent
  ]
})
export class DualListModule { }
