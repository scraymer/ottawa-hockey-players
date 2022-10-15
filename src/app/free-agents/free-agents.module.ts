import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreeAgentsRoutingModule } from './free-agents-routing.module';
import { FreeAgentsViewComponent } from './free-agents-view/free-agents-view.component';


@NgModule({
  declarations: [
    FreeAgentsViewComponent
  ],
  imports: [
    CommonModule,
    FreeAgentsRoutingModule
  ]
})
export class FreeAgentsModule { }
