import { Component, Input, OnInit } from '@angular/core';
import { Opening } from 'src/app/models/opening.model';
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

  constructor(
    private squareService: SquareService,
    private positionsService: PositionsService
  ) {
    this.columns = this.squareService.columns;
    this.lines = this.squareService.lines;
  }

  ngOnInit(): void { }

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
