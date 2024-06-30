import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { GameService } from '../../services/game.service';
import { ColDef, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, AgGridModule]
})
export class GameListComponent implements OnInit {
  private gridApi!: GridApi;
  games: any[] = [];
  filteredGames: any[] = [];
  teams: string[] = [];
  selectedTeams: Set<string> = new Set();

  columnDefs: ColDef[] = [
    { field: 'gameId', headerName: 'Game ID', filter: 'agTextColumnFilter' },
    { field: 'startTime', headerName: 'Start Time', filter: 'agDateColumnFilter', valueFormatter: this.dateFormatter },
    { field: 'homeTeam', headerName: 'Home Team', filter: 'agTextColumnFilter' },
    { field: 'awayTeam', headerName: 'Away Team', filter: 'agTextColumnFilter' },
    { field: 'venue.name', headerName: 'Venue Name', filter: 'agTextColumnFilter' },
    { field: 'venue.city', headerName: 'Venue City', filter: 'agTextColumnFilter' }
  ];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe((data) => {
      this.games = data.map((game) => ({
        ...game,
        startTime: new Date(game.startTime)
      }));
      this.filteredGames = this.games;
      this.teams = Array.from(new Set(this.games.flatMap(game => [game.homeTeam, game.awayTeam])));
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  onTeamSelectionChange(event: any) {
    const team = event.target.value;
    if (event.target.checked) {
      this.selectedTeams.add(team);
    } else {
      this.selectedTeams.delete(team);
    }
    this.applyTeamFilter();
  }

  applyTeamFilter() {
    if (this.selectedTeams.size === 0) {
      this.filteredGames = this.games;
    } else {
      this.filteredGames = this.games.filter(game => {
        const selectedTeamsArray = Array.from(this.selectedTeams);
        return selectedTeamsArray.every(team =>
          (game.homeTeam === team || game.awayTeam === team)
        );
      });
    }
    this.gridApi.setRowData(this.filteredGames);
  }

  dateFormatter(params: any): string {
    return new Date(params.value).toLocaleString();
  }
}
