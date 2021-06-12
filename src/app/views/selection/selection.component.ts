import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Opening } from 'src/app/models/opening.model';
import { OpeningService } from 'src/app/services/opening.service';
import { PositionsService } from 'src/app/services/positions.service';
import { SquareService } from 'src/app/services/square.service';
export interface OpeningFamily {
  opening: Opening;
  childOpenings: Array<OpeningFamily>;
}

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  public selectedOpeningId!: number;
  public openings!: Array<Opening>;
  public openingFamilies: Array<OpeningFamily>;
  public isAddMode: boolean;
  public displayAdd: boolean;

  public newOpeningForm!: FormGroup;

  constructor(
    private openingService: OpeningService,
    private positionsService: PositionsService,
    private squareService: SquareService,
    private formBuilder: FormBuilder
  ) {
    this.openingFamilies = [];
    this.isAddMode = false;
    this.displayAdd = false;
  }

  public ngOnInit(): void {
    this.initForm();
    this.openingService.fetchOpenings();
    this.updateMappedOpeningList();
    this.openingService.opening$.subscribe((opening) => {
      if (opening.id != undefined) {
        this.selectedOpeningId = opening.id;
      }
    }
    );
    this.onChanges();
  }

  private updateMappedOpeningList(): void {
    this.openingService.openingList$.subscribe((openings) => {
      const mappedOpenings = openings.map((opening) => {
        return this.mapOpening(opening, openings);
      });
      this.openingService.setMappedOpenings(mappedOpenings);
    });
    this.openingService.mappedOpeningList$.subscribe((openingList) => {
      this.openings = openingList;
      this.openingFamilies = openingList
        .filter((opening) => !opening.parentOpeningId)
        .map((opening) => {
          let id = 0;
          if (opening.id != undefined) {
            id = opening.id;
          }
          return {
            opening: opening,
            childOpenings: this.setChildOpenings(id, openingList)
          }
        });
    });
  }

  private onChanges(): void {
    const parentOpeningIdField = this.newOpeningForm.get('parentOpeningId');
    if (parentOpeningIdField != null) {
      parentOpeningIdField.valueChanges.subscribe((id) => {
        this.displayAdd = false;
        this.positionsService.resetSrc();
        this.openingService.clearOpening();
        setTimeout(() => {
          if (+id !== 0) {
            const opening = this.openings.find((o) => o.id === +id);
            if (!!opening) {
              this.openingService.setOpening(opening);

              const positions = this.positionsService.positions;
              const position = positions[positions.length - 1];
              this.positionsService.src = position.src;
            }
          }
          this.displayAdd = true;
          this.squareService.setIsAddModeBuilding(true);
        }, 10);
      });
    }
    this.openingService.setIsSaved(false);
  }

  private initForm(): void {
    this.newOpeningForm = this.formBuilder.group(
      {
        parentOpeningId: [null, Validators.required]
      }
    );
  }

  public onValidate(validate: boolean): void {
    if (validate) {
      setTimeout(() => {
        this.openingService.fetchOpenings();
        this.updateMappedOpeningList();
      }, 100);
    }
  }

  private setChildOpenings(id: number, openings: Array<Opening>): Array<OpeningFamily> {
    const childOpenings = openings.filter((opening) => opening.parentOpeningId === id);
    if (childOpenings.length > 0) {
      return childOpenings.map((childOpening) => {
        let id = 0;
        if (childOpening.id != undefined) {
          id = childOpening.id;
        }
        return {
          opening: childOpening,
          childOpenings: this.setChildOpenings(id, openings)
        }
      });
    } else {
      return [];
    }
  }

  public select(): void {
    this.openingService.clearOpening();
    this.squareService.setIsAddMode(false);
    this.isAddMode = this.squareService.isAddMode;
    this.squareService.setIsAddModeBuilding(false);
    this.openingService.setIsSaved(false);
    this.positionsService.setMoveNumberAndColor(0, '');
    this.newOpeningForm.controls['parentOpeningId'].setValue(null);
  }

  public add(): void {
    this.openingService.clearOpening();
    this.squareService.setIsAddMode(true);
    this.isAddMode = this.squareService.isAddMode;
    this.squareService.setIsAddModeBuilding(false);
    this.openingService.setIsSaved(false);
    this.positionsService.setMoveNumberAndColor(0, '');
    this.displayAdd = false;
  }

  mapOpening(opening: Opening, openings: Array<Opening>): Opening {
    const mappedOpening = {
      id: opening.id,
      name: opening.name,
      parentOpeningId: opening.parentOpeningId,
      childOpeningIds: opening.childOpeningIds,
      moves: opening.moves,
    };
    let parentOpeningId: number | null | undefined = opening.parentOpeningId;
    while (!!parentOpeningId) {
      const parentOpening = openings.find((o) => o.id === parentOpeningId);
      parentOpeningId = parentOpening?.parentOpeningId;
      const parentMoves = (!!parentOpening && !!parentOpening.moves) ? parentOpening.moves : [];
      mappedOpening.moves = parentMoves.concat(mappedOpening.moves);
    }
    return mappedOpening;
  }

}