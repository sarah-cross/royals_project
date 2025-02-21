import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { StatsService } from '../../services/stats.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { NgFor, NgIf } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [ 
    MatTableModule,
    MatSortModule, 
    MatPaginatorModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    MatButtonToggleModule,
    MatToolbarModule,
    NgFor,
    NgIf,
    RouterModule,
  ],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent implements OnInit, AfterViewInit {

  
  battingColumns: string[] = ['rank','player', 'org_abbreviation', 'league', 'games', 'at_bats', 'runs', 'hits', 'doubles', 'triples', 'home_runs', 'bases_on_balls', 'strikeouts', 'sacrifices', 'sacrifice_flies', 'stolen_bases', 'caught_stealing', 'avg', 'slg']; 
  pitchingColumns: string[] = ['rank','player', 'org_abbreviation', 'league', 'games', 'games_started', 'complete_games', 'games_finished', 'innings_pitched', 'wins', 'losses', 'saves', 'total_batters_faced', 'at_bats', 'hits', 'doubles', 'triples', 'home_runs', 'bases_on_balls', 'strikeouts', 'whip', 'avg'];
  displayedColumns: string[] = this.battingColumns; // default display batting columns

  years = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2001, 2000];
  selectedYear = 2024;  // default year
  selectedStatType: string = 'batting'; // default stat type

  dataSource = new MatTableDataSource<any>([]);
  

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.loadLeaderboard();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.dataSource) {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log('Sort:', this.sort);
      }
    }, 500);
  }

  updateStatType(statType: string) {
    this.selectedStatType = statType;
    this.displayedColumns = statType === 'batting' ? this.battingColumns : this.pitchingColumns;
    this.loadLeaderboard();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
    // filter by player name
    this.dataSource.filterPredicate = (data, filter) => {
      const name = `${data.player.name_use} ${data.player.name_last}`.toLowerCase();
      return name.includes(filter);
    }
    this.dataSource.filter = filterValue;

    // reset paginator
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  loadLeaderboard(year?: number): void {
    // get batting leaderboard data
    if (this.selectedStatType === 'batting') {
      this.statsService.getBattingLeaderboard(this.selectedYear).subscribe(data => {
        this.dataSource.data = data;
        
      });
    }
    // get pitching leaderboard data
    else if (this.selectedStatType === 'pitching') {
      this.statsService.getPitchingLeaderboard(this.selectedYear).subscribe(data => {
        this.dataSource.data = data;
      });
    }
  }

  onPlayerClick(player: any) {
    console.log('player clicked:', player);
    // add logic to get player profile data 
  }
}
