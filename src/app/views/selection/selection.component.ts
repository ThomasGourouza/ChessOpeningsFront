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

  public newOpeningForm!: FormGroup;

  constructor(
    private openingService: OpeningService,
    private positionsService: PositionsService,
    private squareService: SquareService,
    private formBuilder: FormBuilder
  ) {
    this.openingFamilies = [];
    this.isAddMode = false;
  }

  public ngOnInit(): void {
    this.initForm();
    this.squareService.isAddMode.subscribe((isAddMode) => {
      this.isAddMode = isAddMode;
    });
    this.openingService.opening$.subscribe((opening) =>
      this.selectedOpeningId = opening.id
    );
    this.openingService.mappedOpeningList$.subscribe((openingList) => {
      this.openings = openingList;
      this.openingFamilies = openingList
        .filter((opening) => !opening.parentOpeningId)
        .map((opening) => {
          return {
            opening: opening,
            childOpenings: this.setChildOpenings(opening.id, openingList)
          }
        });
      console.log(this.openingFamilies);
    });
  }

  private initForm(): void {
    this.newOpeningForm = this.formBuilder.group(
      {
        parentOpeningId: [null, Validators.required]
      }
    );
  }

  private setChildOpenings(id: number, openings: Array<Opening>): Array<OpeningFamily> {
    const childOpenings = openings.filter((opening) => opening.parentOpeningId === id);
    if (childOpenings.length > 0) {
      return childOpenings.map((childOpening) => {
        return {
          opening: childOpening,
          childOpenings: this.setChildOpenings(childOpening.id, openings)
        }
      });
    } else {
      return [];
    }
  }

  public select(): void {
    this.openingService.clearOpening();
    this.squareService.setIsAddMode(false);
    this.squareService.setIsAddModeBuilding(false);
  }

  public add(): void {
    this.openingService.clearOpening();
    this.squareService.setIsAddMode(true);
    this.squareService.setIsAddModeBuilding(false);
  }

  public onSubmit(): void {
    const parentId = +this.newOpeningForm.value['parentOpeningId'];
    if (parentId === 0) {
      this.openingService.clearOpening();
    } else {
      const opening = this.openings.find((o) => o.id === parentId);
      if (!!opening) {
        this.openingService.setOpening(opening);

        const positions = this.positionsService.positions;
        const position = positions[positions.length - 1];
        this.positionsService.src = position.src;
      }
    }
    this.squareService.setIsAddModeBuilding(true);
  }

}