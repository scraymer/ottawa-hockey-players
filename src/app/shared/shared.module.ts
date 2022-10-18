import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from './background/background.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    BackgroundComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BackgroundComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
