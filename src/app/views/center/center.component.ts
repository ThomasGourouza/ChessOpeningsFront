import { Component, OnInit } from '@angular/core';
import { Opening } from 'src/app/models/opening.model';
import { OpeningService } from 'src/app/services/opening.service';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class CenterComponent implements OnInit {

  public openings!: Array<Opening>;
  public opening!: Opening;

  constructor(
    private openingService: OpeningService
  ) { }

  public ngOnInit(): void {
    this.openingService.opening$.subscribe((opening) => {
      this.opening = opening;
    });

    this.openingService.fetchOpenings();

    this.openingService.openingList$.subscribe((openings) => {
      const mappedOpenings = openings.map((opening) => {
        return this.mapOpening(opening, openings);
      });
      this.openingService.setMappedOpenings(mappedOpenings);
    });
  }

  mapOpening(opening: Opening, openings: Array<Opening>): Opening {
    const mappedOpening = {
      id: opening.id,
      name: opening.name,
      parentOpeningId: opening.parentOpeningId,
      childOpeningIds: opening.childOpeningIds,
      moves: opening.moves,
    };
    let parentOpeningId: number | undefined = opening.parentOpeningId;
    while (!!parentOpeningId) {
      const parentOpening = openings.find((o) => o.id === opening.parentOpeningId);
      parentOpeningId = parentOpening?.parentOpeningId;
      const parentMoves = (!!parentOpening && !!parentOpening.moves) ? parentOpening.moves : [];
      mappedOpening.moves = parentMoves.concat(mappedOpening.moves);
    }
    return mappedOpening;
  }

}
