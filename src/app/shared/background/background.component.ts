import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundComponent {

  constructor() { }
}
