import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BoardComponent } from './views/board/board.component';
import { CenterComponent } from './views/center/center.component';
import { NavigationComponent } from './views/navigation/navigation.component';
import { OpeningService } from './services/opening.service';
import { SquareService } from './services/square.service';
import { PositionsService } from './services/positions.service';
import { SelectionComponent } from './views/selection/selection.component';
import { ListComponent } from './views/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CenterComponent,
    NavigationComponent,
    SelectionComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
  ],
  providers: [
    SquareService,
    PositionsService,
    OpeningService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
