import { Component, OnInit } from '@angular/core';
import { Opening } from 'src/app/models/opening.model';
import { OpeningService } from 'src/app/services/opening.service';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class CenterComponent implements OnInit {

  public openings: Array<Opening>;
  public opening: Opening;

  constructor(
    private openingService: OpeningService
  ) { 
    this.openings = [];
    this.opening = new Opening(0, '', 0, [], []);
  }

  public ngOnInit(): void {
    this.openingService.fetchOpenings();
    this.openingService.openingList$.subscribe((openingList) => {
      this.openings = openingList;
      this.opening = this.openings[1];
    });
  }

}
