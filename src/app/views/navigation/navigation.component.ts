import { Component, Input, OnInit } from '@angular/core';
import { Move } from 'src/app/models/move.model';
import { Opening } from 'src/app/models/opening.model';
import { OpeningService } from 'src/app/services/opening.service';
import { PositionsService } from 'src/app/services/positions.service';
export interface MOVE {
  moveNumber: number;
  white: string;
  black: string;
  whitePosition: any;
  blackPosition: any;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public moveNumber!: number;
  public color!: string;

  public histo!: Array<MOVE>;

  public currentOpeningId!: number;

  constructor(
    private positionsService: PositionsService,
    private openingService: OpeningService
  ) {
    this.currentOpeningId = 0;
    this.init();
  }

  ngOnInit(): void {
    this.openingService.opening$.subscribe((opening) => {
      if (this.currentOpeningId !== opening.id) {
        this.currentOpeningId = opening.id;
        this.init();
        this.buildPositions(opening);
        this.positionsService.positions.forEach((position) => {
          if (position.moveNumber !== 0) {
            const foundMove = this.histo.find((move) => move.moveNumber === position.moveNumber);
            if (!!foundMove && foundMove.black === '/') {
              const openingMove = opening.moves.find((move) => move.moveNumber === position.moveNumber && move.color === 'B');
              foundMove.black = this.buildHistoMove(openingMove);
              foundMove.blackPosition = position.src;
            } else {
              const openingMove = opening.moves.find((move) => move.moveNumber === position.moveNumber && move.color === 'W');
              this.histo.push({
                moveNumber: position.moveNumber,
                white: this.buildHistoMove(openingMove),
                black: '/',
                whitePosition: position.src,
                blackPosition: null
              });
            }
          }
        });
      }
    });
  }

  private init(): void {
    this.moveNumber = 0;
    this.color = 'B';
    this.histo = [];
  }

  private buildHistoMove(openingMove: Move | undefined): string {
    const piece = (openingMove?.piece !== 'P') ? openingMove?.piece : '';
    return (!!openingMove) ? (piece + openingMove?.columnTo + openingMove?.lineTo) : 'X';
  }

  public go(moveNumber: number, color: string, src: any): void {
    if (!!src) {
      this.moveNumber = moveNumber;
      this.color = color;
      this.positionsService.src = src;
    }
  }

  public next(): void {
    let moveNumber: number;
    let color: string;
    if (this.color === 'B') {
      color = 'W';
      moveNumber = this.moveNumber + 1;
    } else {
      color = 'B';
      moveNumber = this.moveNumber;
    }
    const moveExists = this.positionsService.positions.some((position) =>
      position.color === color
      && position.moveNumber === moveNumber
    );

    if (moveExists) {
      if (this.color === 'B') {
        this.color = 'W';
        this.moveNumber++;
      } else {
        this.color = 'B';
      }
      this.setPosition();
    }
  }

  public previous(): void {
    if (this.moveNumber > 0) {
      if (this.color === 'B') {
        this.color = 'W';
      } else {
        this.color = 'B';
        this.moveNumber--;
      }
      this.setPosition();
    }
  }

  private setPosition(): void {
    this.positionsService.src = this.positionsService.positions.find((position) =>
      position.color === this.color
      && position.moveNumber === this.moveNumber
    )?.src;
  }

  private buildPositions(opening: Opening): void {
    this.positionsService.resetPosition();
    this.positionsService.resetSrc();
    let src = this.positionsService.copySrc(this.positionsService.src);
    this.addNewPosition(this.moveNumber, this.color, src);
    opening.moves.forEach((move) => {
      const from = {
        columnFrom: move?.columnFrom,
        lineFrom: move?.lineFrom
      };
      const to = {
        columnTo: move?.columnTo,
        lineTo: move?.lineTo
      };
      const srcFrom = src[from.columnFrom][from.lineFrom];
      src[from.columnFrom][from.lineFrom] = '';
      src[to.columnTo][to.lineTo] = srcFrom;
      this.addNewPosition(move.moveNumber, move.color, src);
    });
  }

  private addNewPosition(moveNumber: number, color: string, src: any): void {
    const newPosition = {
      moveNumber: moveNumber,
      color: color,
      src: this.positionsService.copySrc(src)
    };
    this.positionsService.addPosition(newPosition);
  }

}