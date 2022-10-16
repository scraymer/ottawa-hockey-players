import { Component, OnInit } from '@angular/core';
import { IFreeAgent } from '../free-agents';
import { FreeAgentsService } from '../free-agents.service';

@Component({
  templateUrl: './free-agents-view.component.html',
  styleUrls: ['./free-agents-view.component.scss']
})
export class FreeAgentsViewComponent implements OnInit  {

  isLoading$ = this.service.loading$;
  hasErrors$ = this.service.error$;

  items: IFreeAgent[] = [];

  constructor(private service: FreeAgentsService) { }

  ngOnInit(): void {
    this.service.get().subscribe((items: IFreeAgent[]) => this.items = items);
  }
}
