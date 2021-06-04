import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
export interface Square {
  column: string;
  line: string;
}

@Injectable({
  providedIn: 'root'
})
export class SquareService {

  private _columns: Array<string>;
  private _lines: Array<string>;
  private _selectedSquare$ = new Subject<Square>();

  private _randomSquare$ = new Subject<Square>();

  constructor() {
    this._columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    this._lines = ['8', '7', '6', '5', '4', '3', '2', '1'];
  }

  get columns(): Array<string> {
    return this._columns;
  }

  get lines(): Array<string> {
    return this._lines;
  }

  get selectedSquare(): Observable<Square> {
    return this._selectedSquare$.asObservable();
  }

  public setSquare(newSquare: Square): void {
    this._selectedSquare$.next(newSquare);
  }

  get randomSquare(): Observable<Square> {
    return this._randomSquare$.asObservable();
  }

  public setRandomSquare(newSquare: Square): void {
    this._randomSquare$.next(newSquare);
  }
}
