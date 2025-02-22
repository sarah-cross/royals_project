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
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(...registerables, annotationPlugin); 

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
    MatTooltipModule,
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
  
  // variables for batting line charts
  battingYears: number[] = [];
  battingAvgs: number[] = [];
  sluggingPercentages: number[] = [];
  singles: number[] = [];
  doubles: number[] = [];
  triples: number[] = [];
  homeruns: number[] = [];
  stolenBasePercentage: number[] = [];

  // variables for pitching line charts
  pitchingYears: number[] = [];
  whip: number[] = [];
  battingAverageAgainst: number[] = [];
  singlesAllowed: number[] = [];
  doublesAllowed: number[] = [];
  triplesAllowed: number[] = [];
  homerunsAllowed: number[] = [];
  k9: number[] = [];

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
      if (this.battingStats.length > 0) this.loadBattingLineCharts();
      if (this.pitchingStats.length > 0) this.loadPitchingLineCharts();
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

  loadBattingLineCharts(): void {
    // sort batting stats oldest to newest and set data for avg and slg
    this.battingStats.sort((a, b) => a.year - b.year);
    this.battingYears = this.battingStats.map(stat => stat.year);
    this.battingAvgs = this.battingStats.map(stat => stat.avg);
    this.sluggingPercentages = this.battingStats.map(stat => stat.slg);

    // set data for hit distribution
    this.singles = this.battingStats.map(stat => stat.hits - (stat.doubles + stat.triples + stat.home_runs));
    this.doubles = this.battingStats.map(stat => stat.doubles);
    this.triples = this.battingStats.map(stat => stat.triples);
    this.homeruns = this.battingStats.map(stat => stat.home_runs);

    // set data for base stealing
    this.stolenBasePercentage = this.battingStats.map(stat => (stat.stolen_bases / (stat.stolen_bases + stat.caught_stealing) * 100));


    // BATTING CHART 1 
    // line chart for batting average and slugging percentage 
    new Chart("battingLineChart", {
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
        }, 
      }
    })

    // BATTING CHART 2
    // line chart for hits, doubles, triples, and home runs
    new Chart("battingLineChart2", {
      type: 'line', 
      data: {
        labels: this.battingYears, 
        datasets: [
          {
            label: 'Singles', 
            data: this.singles,
            borderColor: 'blue', 
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            borderWidth: 2, 
            fill: true, 
          }, 
          {
            label: 'Doubles', 
            data: this.doubles,
            borderColor: 'orange',
            backgroundColor: 'rgba(255, 165, 0, 0.1)',
            borderWidth: 2, 
            fill: true
          }, 
          {
            label: 'Triples', 
            data: this.triples,
            borderColor: 'red', 
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            borderWidth: 2, 
            fill: true
          }, 
          {
            label: 'Home Runs', 
            data: this.homeruns,
            borderColor: 'green', 
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
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
        },
      }
    })

    // BATTING CHART 3
    // stolen base percentage chart 
    new Chart("stolenBasesChart", {
      type: 'bar', 
      data: {
        labels: this.battingYears, 
        datasets: [
          {
            label: 'Steal Success Rate', 
            data: this.stolenBasePercentage,
            borderColor: 'green', 
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
            borderWidth: 2, 
          }, 
        ]
      }, 
      options: {
        responsive: true, 
        scales: {
          y: {
            beginAtZero: true,
            max: 100, 
            ticks: { callback: value => value + '%' }
          }
        }, 
        plugins: {
          annotation: {
            annotations: [{
              type: 'line', 
              id: 'reference-line',
              yScaleID: 'y', 
              yMin: 67, 
              yMax: 67, 
              borderColor: 'gray', 
              borderWidth: 1, 
              borderDash: [5, 5], 
            }]
          }
        }
      }
    })
  }

  loadPitchingLineCharts(): void {
    // sort pitching stats oldest to newest and set data for whip and batting avg against
    this.pitchingStats.sort((a, b) => a.year - b.year);
    this.pitchingYears = this.pitchingStats.map(stat => stat.year);
    this.whip = this.pitchingStats.map(stat => stat.whip);
    this.battingAverageAgainst = this.pitchingStats.map(stat => stat.avg);

    // set data for bases allowed
    this.singlesAllowed = this.pitchingStats.map(stat => stat.hits - (stat.doubles + stat.triples + stat.home_runs));
    this.doublesAllowed = this.pitchingStats.map(stat => stat.doubles);
    this.triplesAllowed = this.pitchingStats.map(stat => stat.triples);
    this.homerunsAllowed = this.pitchingStats.map(stat => stat.home_runs);
    
    // set data for K/9 chart
    this.k9 = this.pitchingStats.map(stat => (stat.strikeouts / stat.innings_pitched) * 9);


    // PITCHING CHART 1 
    // line chart for whip and batting average against
    new Chart("pitchingLineChart", {
      type: 'line', 
      data: {
        labels: this.pitchingYears, 
        datasets: [
          {
            label: 'WHIP', 
            data: this.whip,
            borderColor: 'blue', 
            borderWidth: 2, 
            fill: false
          }, 
          {
            label: 'Batting Average Against', 
            data: this.battingAverageAgainst,
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
        }, 
      }
    })

    // PITCHING CHART 2
    // line chart for bases allowed 
    new Chart("basesAllowedChart", {
      type: 'line', 
      data: {
        labels: this.pitchingYears, 
        datasets: [
          {
            label: 'Singles', 
            data: this.singlesAllowed,
            borderColor: 'blue', 
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            borderWidth: 2, 
            fill: true, 
          }, 
          {
            label: 'Doubles', 
            data: this.doublesAllowed,
            borderColor: 'orange',
            backgroundColor: 'rgba(255, 165, 0, 0.1)',
            borderWidth: 2, 
            fill: true
          }, 
          {
            label: 'Triples', 
            data: this.triplesAllowed,
            borderColor: 'red', 
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            borderWidth: 2, 
            fill: true
          }, 
          {
            label: 'Home Runs', 
            data: this.homerunsAllowed,
            borderColor: 'green', 
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
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
        },
      }
    })

    // PITCHING CHART 3
    // K/9 chart 
    new Chart("k9Chart", {
      type: 'bar', 
      data: {
        labels: this.pitchingYears, 
        datasets: [
          {
            label: 'Strikeouts per 9 Innings', 
            data: this.k9,
            borderColor: 'green', 
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
            borderWidth: 2, 
          }, 
        ]
      }, 
      options: {
        responsive: true, 
        
      }
    })
  }
}
