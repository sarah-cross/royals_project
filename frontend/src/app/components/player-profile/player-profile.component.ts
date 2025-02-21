import { Component } from '@angular/core';
import { StatsService } from '../../services/stats.service';
import { OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-player-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatToolbarModule,
    MatIcon,
    MatMenuModule,
    MatButtonModule,
    NgIf,
    NgFor,
    RouterLink,
  ],
  templateUrl: './player-profile.component.html',
  styleUrl: './player-profile.component.css'
})
export class PlayerProfileComponent implements OnInit, AfterViewInit {
  player: any;
  battingStats: any[] = [];
  pitchingStats: any[] = [];
  battingColumns: string[] = ['year', 'org_abbreviation', 'games', 'at_bats', 'runs', 'hits', 'doubles', 'triples', 'home_runs', 'bases_on_balls', 'strikeouts', 'sacrifices', 'sacrifice_flies', 'stolen_bases', 'caught_stealing', 'avg', 'slg']; 
  pitchingColumns: string[] = ['year', 'org_abbreviation', 'games', 'games_started', 'complete_games', 'games_finished', 'innings_pitched', 'wins', 'losses', 'saves', 'total_batters_faced', 'at_bats', 'hits', 'doubles', 'triples', 'home_runs', 'bases_on_balls', 'strikeouts', 'whip', 'avg'];
  
  battingYears: number[] = [];
  battingAvgs: number[] = [];
  sluggingPercentages: number[] = [];
  singles: number[] = [];
  doubles: number[] = [];
  triples: number[] = [];
  homeruns: number[] = [];

  constructor(private route: ActivatedRoute, private statsService: StatsService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const playerId = Number(params.get('id'));
      if (playerId) {
        this.loadPlayerData(playerId);
      }
    });
  }

  ngAfterViewInit(): void {
      Chart.register(...registerables); 
      this.loadLineCharts();
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

      // debugging
      console.log('player data:', this.player);
      console.log('player batting stats:', this.battingStats);
      console.log('player pitching stats:', this.pitchingStats);
    });
    
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  loadLineCharts(): void {
    // sort batting stats oldest to newest and set data
    this.battingStats.sort((a, b) => a.year - b.year);
    this.battingYears = this.battingStats.map(stat => stat.year);
    this.battingAvgs = this.battingStats.map(stat => stat.avg);
    this.sluggingPercentages = this.battingStats.map(stat => stat.slg);

    this.singles = this.battingStats.map(stat => stat.hits);
    this.doubles = this.battingStats.map(stat => stat.doubles);
    this.triples = this.battingStats.map(stat => stat.triples);
    this.homeruns = this.battingStats.map(stat => stat.home_runs);

    // debugging
    console.log('batting stats years:', this.battingYears);      
    console.log('batting averages:', this.battingAvgs);  
    console.log('slugging percentages:', this.sluggingPercentages);  

    // line chart for batting average and slugging percentage 
    new Chart("lineChart", {
      type: 'line', 
      data: {
        labels: this.battingYears, 
        datasets: [
          {
            label: 'Batting Average', 
            data: this.battingAvgs,
            borderColor: 'blue', 
            borderWidth: 2, 
            fill: false
          }, 
          {
            label: 'Slugging Percentage', 
            data: this.sluggingPercentages,
            borderColor: 'red', 
            borderWidth: 2, 
            fill: false
          }
        ]
      }, 
      options: {
        responsive: true, 
        scales: {
          y: {
            beginAtZero: false,
            type: 'linear'
          }
        }
      }
    })

    // line chart for hits, doubles, triples, and home runs
    new Chart("lineChart2", {
      type: 'line', 
      data: {
        labels: this.battingYears, 
        datasets: [
          {
            label: 'Hits', 
            data: this.singles,
            borderColor: 'blue', 
            backgroundColor: 'rgba(0, 0, 255, 0.3)',
            borderWidth: 2, 
            fill: true
          }, 
          {
            label: 'Doubles', 
            data: this.doubles,
            borderColor: 'red', 
            backgroundColor: 'rgba(255, 0, 0, 0.3)',
            borderWidth: 2, 
            fill: true
          }, 
          {
            label: 'Triples', 
            data: this.triples,
            borderColor: 'orange',
            backgroundColor: 'rgba(255, 165, 0, 0.3)',
            borderWidth: 2, 
            fill: true
          }, 
          {
            label: 'Home Runs', 
            data: this.homeruns,
            borderColor: 'green', 
            backgroundColor: 'rgba(0, 255, 0, 0.3)',
            borderWidth: 2, 
            fill: true
          }
        ]
      }, 
      options: {
        responsive: true, 
        scales: {
          x: { stacked: true }, 
          y: { stacked: false }
        }
      }
    })
  }

}
