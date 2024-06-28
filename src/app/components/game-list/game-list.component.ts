import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class GameListComponent implements OnInit {
  games: any[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe((data) => {
      // Convert the startTime to JST
      this.games = data.map(game => ({
        ...game,
        startTime: this.convertToJST(new Date(game.startTime))
      }));
    });
  }

  // Function to convert date to JST
  convertToJST(date: Date): Date {
    // Create a new date in JST (UTC+9)
    const jstOffset = 9 * 60; // JST is UTC+9
    const localOffset = date.getTimezoneOffset(); // Local offset from UTC in minutes
    const jstTime = new Date(date.getTime() + (jstOffset - localOffset) * 60000);
    return jstTime;
  }
}
