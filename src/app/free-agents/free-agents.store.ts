import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, finalize, Observable, of, Subscription, tap } from "rxjs";
import { IFreeAgent, IFreeAgentError } from "./free-agents";
import { FreeAgentsService } from "./free-agents.service";

const FILTER_JOIN_SYMBOL: string = '+';

const ITEM_FILTER_KEYS: string[] = [
  'name', 'position', 'skill_level', 'locale', 'availability', 'minimum_notice'
];

@Injectable()
export class FreeAgentsStore {

  private _errorSubject = new BehaviorSubject<IFreeAgentError | null>(null);
  public readonly error$ = this._errorSubject.asObservable();

  private _itemsSubject = new BehaviorSubject<IFreeAgent[]>([]);
  public readonly items$ = this._itemsSubject.asObservable();

  private _loadingSubject = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loadingSubject.asObservable();

  public constructor(private service: FreeAgentsService) { }

  /**
   * Retrieve latest free agents from free agents service and return http client observable with
   * auto unsubscribe.
   *
   * @param filter optional string filter
   * @returns http client observable
   */
  public retrieve(filter?: string | null): Observable<IFreeAgent[]> {

    // update loading and error subjects
    this._loadingSubject.next(true);
    this._errorSubject.next(null);

    // retrieve latest free agents data and update states
    return this.service.get().pipe(

      // update error subject on failure and return empty list
      catchError((error: HttpErrorResponse) => {
        this._errorSubject.next(this.resolveError(error));
        return of([]);
      }),

      // update items subject with results
      tap((values: IFreeAgent[]) => this._itemsSubject.next(this.filter(values ?? [], filter ?? ''))),

      // update loading subject when complete
      finalize(() => this._loadingSubject.next(false))
    );
  }

  /**
   * Resolve HTTP error response as error code and message.
   *
   * @param error HTTPErrorResponse
   * @returns error code and message
   */
  private resolveError(error: HttpErrorResponse): IFreeAgentError {

    // log error status to console
    console.error('Failed to access items: ', error)

    // resolve code and message from error or default if undefined
    let code = error?.status ?? 500;
    let message = error?.statusText ?? 'Unknown error';

    // return free agent error from code and message
    return { code, message };
  }

  /**
   * Return filtered list of items by string value. Use plus (+) sign for multiple search values.
   *
   * @param items list of items to filter
   * @param filter filter string value
   * @returns filtered list of items
   */
  private filter(items: IFreeAgent[], filter: string): IFreeAgent[] {

    // split filter on joining symbol
    let filters: string[] = filter.split(FILTER_JOIN_SYMBOL);

    // filter items by filter keys
    return filters.length === 0 ? items : items.filter(
      (i) => filters.every(
        (f) => ITEM_FILTER_KEYS.some(
          (k) => i[k as keyof IFreeAgent].toLowerCase().includes(f.toLowerCase()))));
  }
}
