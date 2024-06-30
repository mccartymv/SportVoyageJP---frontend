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
      this.games = data.map(game => ({
        ...game,
        startTime: new Date(game.startTime)
      }));
    });
  }

}
