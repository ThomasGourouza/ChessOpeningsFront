import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PositionsService } from 'src/app/services/positions.service';
import { SquareService } from 'src/app/services/square.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {

  @Input()
  public selectedOpeningId!: number;

  public addForm!: FormGroup;
  private firstClick: boolean;
  private secondClick: boolean;
  private src!: string;
  private columnFirstClick!: string;
  private lineFirstClick!: string;
  private moveNumber: number;
  private moves: Array<any>;
  private subscription!: Subscription

  constructor(
    private positionService: PositionsService,
    private squareService: SquareService,
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
        const move = {
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
        truc: [null, Validators.required]
      }
    );
  }

  public onSubmit(): void {
    const truc = this.addForm.value['truc'];
    console.log(truc);
    // if this.selectedOpeningId === 0 then null
    console.log(this.selectedOpeningId);
    console.log(this.moves);
  }

}