import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { OpeningApi, OpeningNameParam } from '../api/opening.api';
import { Opening } from '../models/opening.model';


@Injectable({
  providedIn: 'root'
})
export class OpeningService {

  private _opening$ = new Subject<Opening>();
  private _openingList$ = new Subject<Array<Opening>>();

  constructor(
    private openingApi: OpeningApi
  ) { }

  public get opening$() {
    return this._opening$.asObservable();
  }

  public get openingList$() {
    return this._openingList$.asObservable();
  }

  public clearOpening() {
    this._opening$.next(new Opening(0, '', 0, [], []));
  }

  public clearOpeningList() {
    this._openingList$.next([]);
  }

  public fetchOpenings(name?: string) {
    const openingsObservable = !!name ?
      this.openingApi.getOpeningByName(new OpeningNameParam(name)) : this.openingApi.getOpenings();
    openingsObservable.toPromise()
      .then((openings: Array<Opening>) => {
        this._openingList$.next(openings);
      })
      .catch((error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  public fetchOpeningById(id: number) {
    this.openingApi.getOpeningById(id)
      .toPromise()
      .then((opening: Opening) => {
        this._opening$.next(opening);
      })
      .catch((error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  public addOpening(newOpening: Opening) {
    this.openingApi.createOpening(newOpening)
      .toPromise()
      .then(() => {
        console.log("201");
      })
      .catch((error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  public deleteOpeningById(id: number) {
    this.openingApi.deleteOpeningById(id)
      .toPromise()
      .then(() => {
        this.fetchOpenings();
        console.log("ok");
      })
      .catch((error: HttpErrorResponse) => {
        console.log(error);
      });
  }

}

