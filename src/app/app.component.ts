import { Component } from '@angular/core';
import { GameListComponent } from './components/game-list/game-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  template: '<app-game-list></app-game-list>',
  standalone: true,
  imports: [GameListComponent, HttpClientModule, CommonModule]  // Ensure HttpClientModule is imported
})
export class AppComponent { }
