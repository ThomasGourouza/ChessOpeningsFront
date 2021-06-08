import { Component, OnInit } from '@angular/core';
import { Opening } from 'src/app/models/opening.model';
import { OpeningService } from 'src/app/services/opening.service';
import { PositionsService } from 'src/app/services/positions.service';
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

  public openings!: Array<Opening>;
  public selectedOpeningId!: number;
  public openingFamilies: Array<OpeningFamily>;

  constructor(
    private openingService: OpeningService
  ) {
    this.openingFamilies = [];
  }

  public ngOnInit(): void {

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
            childOpenings: this.setChildOpenings(opening.id)
          }
        });
      console.log(this.openingFamilies);
    });
  }

  private setChildOpenings(id: number): Array<OpeningFamily> {
    const childOpenings = this.openings.filter((opening) => opening.parentOpeningId === id);
    if (childOpenings.length > 0) {
      return childOpenings.map((childOpening) => {
        return {
          opening: childOpening,
          childOpenings: this.setChildOpenings(childOpening.id)
        }
      });
    } else {
      return [];
    }
  }

  public select(): void {
    this.openingService.clearOpening();
  }

}