import { Component, OnInit } from '@angular/core';
import { Opening } from 'src/app/models/opening.model';
import { OpeningService } from 'src/app/services/opening.service';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html'
})
export class CenterComponent implements OnInit {

  public opening!: Opening;

  constructor(
    private openingService: OpeningService
  ) { }

  public ngOnInit(): void {

    this.openingService.opening$.subscribe((opening) => {
      this.opening = opening;
    });
    this.openingService.setIsSaved(false);
  }

}
