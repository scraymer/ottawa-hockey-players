import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from './background/background.component';
import { HeaderComponent } from './header/header.component';
import { ShortNamePipe } from './short-name/short-name.pipe';

@NgModule({
  declarations: [
    BackgroundComponent,
    HeaderComponent,
    ShortNamePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BackgroundComponent,
    HeaderComponent,
    ShortNamePipe
  ]
})
export class SharedModule { }
