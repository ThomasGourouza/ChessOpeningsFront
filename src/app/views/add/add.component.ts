import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Move } from 'src/app/models/move.model';
import { Opening } from 'src/app/models/opening.model';
import { OpeningService } from 'src/app/services/opening.service';
import { PositionsService } from 'src/app/services/positions.service';
import { SquareService } from 'src/app/services/square.service';
export interface MoveToDisplay {
  moveNumber: number;
  white: string;
  black: string;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit, OnDestroy {

  @Input()
  public selectedOpeningId!: number;
  @Output()
  public validateEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public addForm!: FormGroup;
  private firstClick: boolean;
  private secondClick: boolean;
  private src!: string;
  private columnFirstClick!: string;
  private lineFirstClick!: string;
  private moveNumber: number;
  public moves: Array<Move>;
  private subscription!: Subscription;

  constructor(
    private positionService: PositionsService,
    private squareService: SquareService,
    private openingService: OpeningService,
    private formBuilder: FormBuilder
  ) {
    this.firstClick = true;
    this.secondClick = false;
    this.moveNumber = 0;
    this.moves = [];
  }

  public ngOnInit(): void {
    this.initForm();
    const positions = this.positionService.positions;
    if (positions.length > 0) {
      this.moveNumber = positions[positions.length - 1].moveNumber;
    }
    this.subscription = this.squareService.selectedSquare.subscribe((selectedSquare) => {
      const column = selectedSquare.column;
      const line = selectedSquare.line;
      if (this.firstClick && !this.secondClick) {
        this.firstClick = false;
        this.secondClick = true;
        this.columnFirstClick = column;
        this.lineFirstClick = line;
        this.src = this.positionService.src[column][line];
      } else if (!this.firstClick && this.secondClick) {
        this.firstClick = true;
        this.secondClick = false;
        this.positionService.src[this.columnFirstClick][this.lineFirstClick] = '';
        this.positionService.src[column][line] = this.src;
        const colorPiece = this.src.split('../../../assets/figures/')[1].split('.png')[0];
        const arrayPiece = colorPiece.split('');
        for (let i = 0; i < 5; i++) {
          arrayPiece.shift();
        }
        const piece = arrayPiece.join('');
        const pieceSymbol = (piece === 'Knight') ? 'N' : piece.split('')[0];

        if (colorPiece.includes('White')) {
          this.moveNumber++;
        }
        const move: Move = {
          moveNumber: this.moveNumber,
          color: (colorPiece.includes('White')) ? 'W' : 'B',
          piece: pieceSymbol,
          columnFrom: this.columnFirstClick,
          lineFrom: this.lineFirstClick,
          columnTo: column,
          lineTo: line
        };
        this.moves.push(move);
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initForm(): void {
    this.addForm = this.formBuilder.group(
      {
        name: [null, Validators.required]
      }
    );
  }

  public onSubmit(): void {
    const name = this.addForm.value['name'];
    const opening: Opening = {
      name: name,
      parentOpeningId: (this.selectedOpeningId !== 0) ? this.selectedOpeningId : null,
      moves: this.moves
    }
    this.openingService.addOpening(opening);
    this.openingService.fetchOpenings();
    this.validateEmitter.emit(true);
  }

  public mapMovesToDisplay(moves: Array<Move>): Array<MoveToDisplay> {
    const movesToDisplay: Array<MoveToDisplay> = [];
    if (moves.length > 0) {
      const lastMove = moves[0];
      if (lastMove.color === 'B') {
        movesToDisplay.push({
          white: '...',
          black: lastMove.piece + lastMove.columnTo + lastMove.lineTo,
          moveNumber: lastMove.moveNumber
        });
      }
    }
    moves.forEach((move) => {
      const foundMoveToDisplay = movesToDisplay.find((moveToDisplay) => moveToDisplay.moveNumber === move.moveNumber);
      if (foundMoveToDisplay != undefined) {
        foundMoveToDisplay.black = ((move.piece !== 'P') ? move.piece : '') + move.columnTo + move.lineTo;
      } else {
        movesToDisplay.push({
          white: ((move.piece !== 'P') ? move.piece : '') + move.columnTo + move.lineTo,
          black: '',
          moveNumber: move.moveNumber
        });
      }
    });
    return movesToDisplay;
  }

}