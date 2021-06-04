import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { NotfoundComponent } from '../views/notfound/notfound.component';
// import { WelcomeComponent } from '../views/welcome/welcome.component';
// import { AdjectivesComponent } from '../views/russian/adjectives/adjectives.component';

const routes: Routes = [
  // { path: 'welcome', component: WelcomeComponent },
  // { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  // { path: 'adjectives', component: AdjectivesComponent },
  // { path: 'adjectives/:category', component: AdjectivesComponent },
  // { path: 'adjectives/consult/:adjective', component: AdjectivesComponent },
  // { path: 'adjectives/add/:adjective', component: AdjectivesComponent },
  // { path: 'not-found', component: NotfoundComponent },
  // { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
