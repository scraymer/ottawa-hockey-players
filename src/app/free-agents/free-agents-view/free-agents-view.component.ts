import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import { IFreeAgent, IFreeAgentError } from '../free-agents';
import { FreeAgentsStore } from '../free-agents.store';

const ITEM_VALUE_SORT_MAP = {
  'skill_level': { 'High': 3, 'Medium': 2, 'Low': 1 }
}

@Component({
  templateUrl: './free-agents-view.component.html',
  providers: [FreeAgentsStore]
})
export class FreeAgentsViewComponent implements OnInit, OnDestroy  {

  private subscriptions: Subscription = new Subscription();

  error: string | null = null;
  items: IFreeAgent[] = [];
  loading: boolean = false;
  search = new FormControl<string>('');

  constructor(private store: FreeAgentsStore) { }

  ngOnInit(): void {

    // subscribe to different store observables and update attributes
    this.subscriptions.add(this.store.error$.subscribe((value: IFreeAgentError | null) => this.error = this.resolveErrorMessage(value)));
    this.subscriptions.add(this.store.items$.subscribe((values: IFreeAgent[]) => this.items = values.sort(this.defaultSort)));
    this.subscriptions.add(this.store.loading$.subscribe((value: boolean) => this.loading = value));

    // subscribe to search value changes and update free agent list
    this.subscriptions.add(this.search.valueChanges.pipe(debounceTime(500)).subscribe(
      (value) => this.store.retrieve(value).subscribe()));

    // retrieve latest store values initialization
    this.store.retrieve().subscribe();
  }

  ngOnDestroy(): void {

    // cleanup all subscriptions
    this.subscriptions.unsubscribe();
  }

  private defaultSort(a: IFreeAgent, b: IFreeAgent): number {

    // transform skill levels into sort order
    const a_skill_level_sort = ITEM_VALUE_SORT_MAP.skill_level[a.skill_level] ?? 0;
    const b_skill_level_sort = ITEM_VALUE_SORT_MAP.skill_level[b.skill_level] ?? 0;

    // sort free agents by position desc, skill level sort desc, location asc, and name asc
    return b.position.localeCompare(a.position)
      || b_skill_level_sort - a_skill_level_sort
      || a.locale.localeCompare(b.locale)
      || a.name.localeCompare(b.name as string);
  }

  private resolveErrorMessage(error: IFreeAgentError | null): string | null {

    // return null if no error provided
    if (error === null) return null;

    // return not found response for 4xx series errors
    else if (error.code >= 400 && error.code < 500) return 'Items could not be found.';

    // return
    return `Failed to retrieve items.`;
  }
}
