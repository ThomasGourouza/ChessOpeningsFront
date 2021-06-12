import { Component, Input, OnInit } from '@angular/core';
import { Move } from 'src/app/models/move.model';
import { OpeningService } from 'src/app/services/opening.service';
import { PositionsService } from 'src/app/services/positions.service';
import { Square, SquareService } from 'src/app/services/square.service';
export interface POSITION {
  moveNumber: number;
  color: string;
  src: any;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  // construction du board dans le HTML
  public columns: Array<string>;
  public lines: Array<string>;

  public selectedSquare!: Square;

  private currentColumn!: string | undefined;
  private currentLine!: string | undefined;
  private mvNumber!: number;
  private color!: string;
  private moves!: Array<Move>;

  constructor(
    private squareService: SquareService,
    private positionsService: PositionsService,
    private openingService: OpeningService,
  ) {
    this.columns = this.squareService.columns;
    this.lines = this.squareService.lines;
  }

  ngOnInit(): void {
    this.openingService.opening$.subscribe((opening) => {
      this.moves = opening.moves;
    });

    this.positionsService.getMoveNumberAndColor().subscribe((mvcol) => {
      this.mvNumber = mvcol.moveNumber;
      this.color = mvcol.color;
      const mv = this.moves.find((move) =>
        move.moveNumber === this.mvNumber && move.color === this.color
      );
      this.currentColumn = mv?.columnTo;
      this.currentLine = mv?.lineTo;
    });

  }

  public isCurrent(column: string, line: string): boolean {
    return !this.squareService.isAddMode
      && column === this.currentColumn
      && line === this.currentLine;
  }

  public onClick(column: string, line: string): void {
    this.selectedSquare = {
      column: column,
      line: line
    };
    this.squareService.setSquare(this.selectedSquare);
  }

  public getSource(column: string, line: string): string {
    return !!this.positionsService.src ? this.positionsService.src[column][line] : "";
  }

}
