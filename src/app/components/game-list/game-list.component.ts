import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { GameService } from '../../services/game.service';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, AgGridModule]
})
export class GameListComponent implements OnInit {
  games: any[] = [];
  columnDefs: ColDef[] = [
    { field: 'gameId', headerName: 'Game ID' },
    { field: 'startTime', headerName: 'Start Time', valueFormatter: this.dateFormatter },
    { field: 'homeTeam', headerName: 'Home Team' },
    { field: 'awayTeam', headerName: 'Away Team' },
    { field: 'venue.name', headerName: 'Venue Name' },
    { field: 'venue.city', headerName: 'Venue City' }
  ];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe((data) => {
      this.games = data.map(game => ({
        ...game,
        startTime: new Date(game.startTime)
      }));
    });
  }

  dateFormatter(params: any): string {
    return new Date(params.value).toLocaleString();
  }
}
