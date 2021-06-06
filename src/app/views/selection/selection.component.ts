import { Component, Input, OnInit } from '@angular/core';
import { Opening } from 'src/app/models/opening.model';
import { OpeningService } from 'src/app/services/opening.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  public openings!: Array<Opening>;
  public selectedOpeninId: number;

  constructor(
    private openingService: OpeningService
  ) {
    this.selectedOpeninId = 0;
  }

  public ngOnInit(): void {
    this.openingService.mappedOpeningList$.subscribe((openingList) => {
      this.openings = openingList;
    });
  }

  public select(opening: Opening | undefined): void {
    if (opening != undefined) {
      this.selectedOpeninId = opening.id;
      this.openingService.setOpening(opening);
    } else {
      this.selectedOpeninId = 0;
      this.openingService.clearOpening();
    }
  }

}