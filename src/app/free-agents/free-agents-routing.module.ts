import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreeAgentsViewComponent } from './free-agents-view/free-agents-view.component';

const routes: Routes = [
  { title: 'Free Agents - Ottawa Hockey Players', path: 'free-agents', component: FreeAgentsViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreeAgentsRoutingModule { }
