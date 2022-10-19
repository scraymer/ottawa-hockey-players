import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFreeAgent } from './free-agents';

@Injectable({
  providedIn: 'root'
})
export class FreeAgentsService {

  constructor(private http: HttpClient) { }

  /**
   * Retrieves list of free agents from latest data.
   *
   * @returns list of free agents
   */
  get(): Observable<IFreeAgent[]> {

    // retrieve latest free agents data
    return this.http.get<IFreeAgent[]>('assets/data/free-agents.json');
  }
}
