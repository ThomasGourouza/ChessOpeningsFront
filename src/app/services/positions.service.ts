import { Injectable } from '@angular/core';
export interface POSITION {
  moveNumber: number;
  color: string;
  src: any;
}

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  private _srcInit: any;
  private _src: any;
  private _positions: Array<POSITION>;
  // private _color: string;
  // private _moveNumber: number;

  constructor() {
    this._srcInit = {
      a: {
        1: "../../../assets/figures/WhiteRook.png",
        2: "../../../assets/figures/WhitePawn.png",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "../../../assets/figures/BlackPawn.png",
        8: "../../../assets/figures/BlackRook.png"
      },
      b: {
        1: "../../../assets/figures/WhiteKnight.png",
        2: "../../../assets/figures/WhitePawn.png",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "../../../assets/figures/BlackPawn.png",
        8: "../../../assets/figures/BlackKnight.png"
      },
      c: {
        1: "../../../assets/figures/WhiteBishop.png",
        2: "../../../assets/figures/WhitePawn.png",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "../../../assets/figures/BlackPawn.png",
        8: "../../../assets/figures/BlackBishop.png"
      },
      d: {
        1: "../../../assets/figures/WhiteQueen.png",
        2: "../../../assets/figures/WhitePawn.png",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "../../../assets/figures/BlackPawn.png",
        8: "../../../assets/figures/BlackQueen.png"
      },
      e: {
        1: "../../../assets/figures/WhiteKing.png",
        2: "../../../assets/figures/WhitePawn.png",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "../../../assets/figures/BlackPawn.png",
        8: "../../../assets/figures/BlackKing.png"
      },
      f: {
        1: "../../../assets/figures/WhiteBishop.png",
        2: "../../../assets/figures/WhitePawn.png",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "../../../assets/figures/BlackPawn.png",
        8: "../../../assets/figures/BlackBishop.png"
      },
      g: {
        1: "../../../assets/figures/WhiteKnight.png",
        2: "../../../assets/figures/WhitePawn.png",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "../../../assets/figures/BlackPawn.png",
        8: "../../../assets/figures/BlackKnight.png"
      },
      h: {
        1: "../../../assets/figures/WhiteRook.png",
        2: "../../../assets/figures/WhitePawn.png",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "../../../assets/figures/BlackPawn.png",
        8: "../../../assets/figures/BlackRook.png"
      }
    };
    this.resetSrc();
    this._positions = [];
    // this._color = 'B';
    // this._moveNumber = 0;
  }

  get src(): any {
    return this._src;
  }

  set src(src: any) {
    this._src = src;
  }

  get positions(): Array<POSITION> {
    return this._positions;
  }

  // get color(): string {
  //   return this._color;
  // }

  // set color(color: string) {
  //   this._color = color;
  // }

  // get moveNumber(): number {
  //   return this._moveNumber;
  // }

  // set moveNumber(moveNumber: number) {
  //   this._moveNumber = moveNumber;
  // }

  public addPosition(position: POSITION): void {
    this._positions.push(position);
  }

  public resetPosition(): void {
    this._positions = [];
  }

  public resetSrc(): void {
    this.src = this.copySrc(this._srcInit);
  }

  public copySrc(src: any): any {
    return {
      a: {
        1: src.a['1'],
        2: src.a['2'],
        3: src.a['3'],
        4: src.a['4'],
        5: src.a['5'],
        6: src.a['6'],
        7: src.a['7'],
        8: src.a['8']
      },
      b: {
        1: src.b['1'],
        2: src.b['2'],
        3: src.b['3'],
        4: src.b['4'],
        5: src.b['5'],
        6: src.b['6'],
        7: src.b['7'],
        8: src.b['8']
      },
      c: {
        1: src.c['1'],
        2: src.c['2'],
        3: src.c['3'],
        4: src.c['4'],
        5: src.c['5'],
        6: src.c['6'],
        7: src.c['7'],
        8: src.c['8']
      },
      d: {
        1: src.d['1'],
        2: src.d['2'],
        3: src.d['3'],
        4: src.d['4'],
        5: src.d['5'],
        6: src.d['6'],
        7: src.d['7'],
        8: src.d['8']
      },
      e: {
        1: src.e['1'],
        2: src.e['2'],
        3: src.e['3'],
        4: src.e['4'],
        5: src.e['5'],
        6: src.e['6'],
        7: src.e['7'],
        8: src.e['8']
      },
      f: {
        1: src.f['1'],
        2: src.f['2'],
        3: src.f['3'],
        4: src.f['4'],
        5: src.f['5'],
        6: src.f['6'],
        7: src.f['7'],
        8: src.f['8']
      },
      g: {
        1: src.g['1'],
        2: src.g['2'],
        3: src.g['3'],
        4: src.g['4'],
        5: src.g['5'],
        6: src.g['6'],
        7: src.g['7'],
        8: src.g['8']
      },
      h: {
        1: src.h['1'],
        2: src.h['2'],
        3: src.h['3'],
        4: src.h['4'],
        5: src.h['5'],
        6: src.h['6'],
        7: src.h['7'],
        8: src.h['8']
      }
    };
  }

}
