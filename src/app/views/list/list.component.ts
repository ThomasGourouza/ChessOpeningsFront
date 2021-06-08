import { Component, Input, OnInit } from '@angular/core';
import { Opening } from 'src/app/models/opening.model';
import { OpeningService } from 'src/app/services/opening.service';
import { OpeningFamily } from '../selection/selection.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input()
  public openingFamily!: OpeningFamily;
  public selectedOpeningId!: number;

  constructor(
    private openingService: OpeningService
  ) { }

  public ngOnInit(): void {
    this.openingService.opening$.subscribe((opening) =>
      this.selectedOpeningId = opening.id
    );
  }

  public select(opening: Opening): void {
    this.openingService.setOpening(opening);
  }

}
