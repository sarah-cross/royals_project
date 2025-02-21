import { Component } from '@angular/core';
import { StatsService } from '../../services/stats.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-player-profile',
  imports: [
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    NgIf,
  ],
  templateUrl: './player-profile.component.html',
  styleUrl: './player-profile.component.css'
})
export class PlayerProfileComponent implements OnInit {
  player: any;
  battingStats: any[] = [];
  pitchingStats: any[] = [];
  battingColumns: string[] = ['year', 'org_abbreviation', 'games', 'at_bats', 'runs', 'hits', 'doubles', 'triples', 'home_runs', 'bases_on_balls', 'strikeouts', 'stolen_bases', 'caught_stealing', 'avg', 'slg']; 
  pitchingColumns: string[] = ['year', 'org_abbreviation', 'games', 'games_started', 'complete_games', 'games_finished', 'innings_pitched', 'wins', 'losses', 'saves', 'total_batters_faced', 'at_bats', 'hits', 'doubles', 'triples', 'home_runs', 'bases_on_balls', 'strikeouts', 'whip', 'avg'];
  
  constructor(private route: ActivatedRoute, private statsService: StatsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const playerId = Number(params.get('id'));
      if (playerId) {
        this.loadPlayerData(playerId);
      }
    });
  }

  loadPlayerData(playerId: number): void {
    console.log('playerID:', playerId);
    this.statsService.getPlayerDetails(playerId).subscribe(data => {
      this.player = data;

      if (this.player.batting_stats) {
        this.battingStats = this.player.batting_stats;
        this.battingStats.sort((a, b) => b.year - a.year);
      }

      if (this.player.pitching_stats) {
        this.pitchingStats = this.player.pitching_stats;
        this.pitchingStats.sort((a, b) => b.year - a.year);
      }
      
      console.log('player data:', this.player);
      console.log('player batting stats:', this.battingStats);
      console.log('player pitching stats:', this.pitchingStats);
    });
    
  }

}
