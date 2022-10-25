import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreeAgentsRoutingModule } from './free-agents-routing.module';
import { FreeAgentsViewComponent } from './free-agents-view/free-agents-view.component';
import { FreeAgentsCardComponent } from './free-agents-card/free-agents-card.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FreeAgentsViewComponent,
    FreeAgentsCardComponent
  ],
  imports: [
    CommonModule,
    FreeAgentsRoutingModule,
    SharedModule
  ]
})
export class FreeAgentsModule { }
