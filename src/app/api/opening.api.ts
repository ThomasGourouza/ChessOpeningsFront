import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Opening } from '../models/opening.model';
export class OpeningNameParam {
  constructor(
    public name: string
  ) { }
}

const API_Opening_URL = 'http://localhost:8080/api/v1/opening';

@Injectable({
  providedIn: 'root'
})
export class OpeningApi {

  constructor(
    private http: HttpClient
  ) { }

  public getOpenings(): Observable<Array<Opening>> {
    return this.http.get<Array<Opening>>(API_Opening_URL);
  }

  public getOpeningByName(name: OpeningNameParam): Observable<Array<Opening>> {
    return this.http.get<Array<Opening>>(API_Opening_URL, {
      observe: 'body',
      params: this.asHttpParam(name)
    });
  }

  public getOpeningById(id: number): Observable<Opening> {
    return this.http.get<Opening>(API_Opening_URL + '/' + id);
  }

  public createOpening(opening: Opening): Observable<Opening> {
    return this.http.post<Opening>(API_Opening_URL, opening);
  }

  public deleteOpeningById(id: number): Observable<void> {
    return this.http.delete<void>(API_Opening_URL + '/' + id);
  }

  public asHttpParam(object: any): HttpParams {
    let httpParams = new HttpParams();
    for (const param in object) {
      httpParams = httpParams.set(param, object[param]);
    }
    return httpParams;
  }

}
