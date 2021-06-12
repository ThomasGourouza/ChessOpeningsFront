import { Component, Input, OnInit } from '@angular/core';
import { Move } from 'src/app/models/move.model';
import { Opening } from 'src/app/models/opening.model';
import { OpeningService } from 'src/app/services/opening.service';
import { PositionsService } from 'src/app/services/positions.service';
import { SquareService } from 'src/app/services/square.service';
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
  private unTouchedOpeningList!: Array<Opening>;
  public confirmDelete: boolean;

  constructor(
    private positionsService: PositionsService,
    private openingService: OpeningService,
    private squareService: SquareService
  ) {
    this.currentOpeningId = 0;
    this.init();
    this.confirmDelete = false;
  }

  ngOnInit(): void {
    this.openingService.unTouchedOpeningList$.subscribe((openings) => {
      this.unTouchedOpeningList = openings;
    });
    this.openingService.opening$.subscribe((opening) => {
      if (this.currentOpeningId !== opening.id && opening.id != undefined) {
        this.currentOpeningId = opening.id;
        this.init();
        this.buildPositions(opening);
        this.positionsService.positions.forEach((position) => {
          if (position.moveNumber !== 0) {
            const foundMove = this.histo.find((move) => move.moveNumber === position.moveNumber);
            if (!!foundMove && foundMove.black === '') {
              const openingMove = opening.moves.find((move) => move.moveNumber === position.moveNumber && move.color === 'B');
              foundMove.black = this.buildHistoMove(openingMove);
              foundMove.blackPosition = position.src;
            } else {
              const openingMove = opening.moves.find((move) => move.moveNumber === position.moveNumber && move.color === 'W');
              this.histo.push({
                moveNumber: position.moveNumber,
                white: this.buildHistoMove(openingMove),
                black: '',
                whitePosition: position.src,
                blackPosition: null
              });
            }
          }
        });
        if (!this.squareService.isAddMode) {
          const currentOpeningFirstMove = this.unTouchedOpeningList.find((o) => o.id === this.currentOpeningId)?.moves[0];
          if (currentOpeningFirstMove?.moveNumber && currentOpeningFirstMove?.color) {
            this.moveNumber = currentOpeningFirstMove?.moveNumber;
            this.color = currentOpeningFirstMove?.color;
            this.setPosition();
            this.positionsService.setMoveNumberAndColor(this.moveNumber, this.color);
          }
        }
      }
    });
    this.squareService.isAddModeBuilding.subscribe((isAddModeBuilding) => {
      if (isAddModeBuilding && this.histo.length > 0) {
        this.moveNumber = this.histo[this.histo.length - 1].moveNumber;
        this.color = (this.histo[this.histo.length - 1].black === '') ? 'W' : 'B';
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
      this.positionsService.setMoveNumberAndColor(this.moveNumber, this.color);
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
    this.positionsService.setMoveNumberAndColor(this.moveNumber, this.color);
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
    this.positionsService.setMoveNumberAndColor(this.moveNumber, this.color);
  }

  private setPosition(): void {
    this.positionsService.src = this.positionsService.positions.find((position) =>
      position.color === this.color
      && position.moveNumber === this.moveNumber
    )?.src;
  }

  private buildPositions(opening: Opening): void {
    this.positionsService.resetPositions();
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

  public isNotAddMode(): boolean {
    return !this.squareService.isAddMode;
  }

  public confirmDeletion(): void {
    this.confirmDelete = true;
  }

  public delete(): void {
    this.openingService.deleteOpeningById(this.currentOpeningId);
    this.confirmDelete = false;
    this.currentOpeningId = 0;
    this.histo = [];
    this.openingService.clearOpening();
  }

  public cancelDelete(): void {
    this.confirmDelete = false;
  }

}
