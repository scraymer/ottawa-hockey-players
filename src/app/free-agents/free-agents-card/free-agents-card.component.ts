import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IFreeAgent } from '../free-agents';

@Component({
  selector: 'app-free-agents-card',
  templateUrl: './free-agents-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FreeAgentsCardComponent {

  @Input() agent!: IFreeAgent;

  constructor() { }
}
