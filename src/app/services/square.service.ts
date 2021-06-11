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

  // private _isAddMode$ = new Subject<boolean>();
  private _isAddMode: boolean;
  private _isAddModeBuilding$ = new Subject<boolean>();
  private _selectedSquare$ = new Subject<Square>();

  constructor() {
    this._columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    this._lines = ['8', '7', '6', '5', '4', '3', '2', '1'];
    this._isAddMode = false;
  }

  get columns(): Array<string> {
    return this._columns;
  }

  get lines(): Array<string> {
    return this._lines;
  }

  // get isAddMode(): Observable<boolean> {
  //   return this._isAddMode$.asObservable();
  // }

  get isAddMode(): boolean {
    return this._isAddMode;
  }

  get isAddModeBuilding(): Observable<boolean> {
    return this._isAddModeBuilding$.asObservable();
  }

  // public setIsAddMode(isAddMode: boolean): void {
  //   this._isAddMode$.next(isAddMode);
  // }

  public setIsAddMode(isAddMode: boolean): void {
    this._isAddMode = isAddMode;
  }

  public setIsAddModeBuilding(isAddModeBuilding: boolean): void {
    this._isAddModeBuilding$.next(isAddModeBuilding);
  }

  get selectedSquare(): Observable<Square> {
    return this._selectedSquare$.asObservable();
  }

  public setSquare(newSquare: Square): void {
    this._selectedSquare$.next(newSquare);
  }

}
