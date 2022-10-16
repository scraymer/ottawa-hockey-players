import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { IFreeAgent } from './free-agents';

@Injectable({
  providedIn: 'root'
})
export class FreeAgentsService {

  private _loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this._loadingSubject.asObservable();

  private _errorSubject = new BehaviorSubject<string | null>(null);
  error$ = this._errorSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Retrieves list of free agents from latest data.
   *
   * @returns list of free agents
   */
  get(): Observable<IFreeAgent[]> {

    // update loading and error subjects
    this._loadingSubject.next(true);
    this._errorSubject.next(null);

    // retrieve latest free agents data
    return this.http.get<IFreeAgent[]>('/assets/data/free-agents.json').pipe(

      // update error subject on failure
      catchError((error: any) => {
        this._errorSubject.next(error);
        return of([]);
      }),

      // update loading subject when complete
      finalize(() => this._loadingSubject.next(false))
    )
  }
}
