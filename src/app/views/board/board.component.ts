import { Component, Input, OnInit } from '@angular/core';
import { Opening } from 'src/app/models/opening.model';
import { SquareService } from 'src/app/services/square.service';
export interface SRC {
  a: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
  },
  b: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
  },
  c: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
  },
  d: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
  },
  e: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
  },
  f: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
  },
  g: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
  },
  h: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
  }
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input()
  public opening!: Opening;

  public columns: Array<string>;
  public lines: Array<string>;

  private moveNumber: number;
  private color: string;

  public src: SRC;

  constructor(private squareService: SquareService) {
    this.columns = this.squareService.columns;
    this.lines = this.squareService.lines;
    this.moveNumber = 1;
    this.color = 'W';
    this.src = {
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
  }

  ngOnInit(): void { }

  public onClick(column: string, line: string): void {
    this.selectedSquare = {
      column: column,
      line: line
    };
    this.squareService.setSquare(this.selectedSquare);
    console.log(this.selectedSquare);
  }

  public next(): void {
    const move = this.opening.moves
      .find((opening) => opening.moveNumber === this.moveNumber && opening.color === this.color);
    if (!!move) {
      const from = {
        columnFrom: move?.columnFrom,
        lineFrom: move?.lineFrom
      };
      const to = {
        columnTo: move?.columnTo,
        lineTo: move?.lineTo
      };
      console.log(from);
      console.log(to);

      const srcFrom = this.src[from.columnFrom][from.lineFrom];
      this.src[from.columnFrom][from.lineFrom] = '';
      this.src[to.columnTo][to.lineTo] = srcFrom;

      if (this.color === 'W') {
        this.color = 'B';
      } else {
        this.color = 'W';
        this.moveNumber++;
      }
    }
  }

  public previous(): void {
    const oldColor = this.color;
    const oldMoveNumber = this.moveNumber;
    if (this.color === 'W') {
      this.color = 'B';
      this.moveNumber--;
    } else {
      this.color = 'W';
    }
    const move = this.opening.moves
      .find((opening) => opening.moveNumber === this.moveNumber && opening.color === this.color);
    if (!!move) {
      const from = {
        columnFrom: move?.columnFrom,
        lineFrom: move?.lineFrom
      };
      const to = {
        columnTo: move?.columnTo,
        lineTo: move?.lineTo
      };
      console.log(from);
      console.log(to);

      const srcFrom = this.src[to.columnTo][to.lineTo];
      this.src[to.columnTo][to.lineTo] = '';
      this.src[from.columnFrom][from.lineFrom] = srcFrom;
    } else {
      this.color = oldColor;
      this.moveNumber = oldMoveNumber;
    }

  }

  public getSource(column: string, line: string): string {
    return this.src[column][line];
  }
}
