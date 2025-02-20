import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { LeaderboardService } from '../../services/leaderboard.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { NgFor } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-batting-leaderboard',
  standalone: true,
  imports: [ 
    MatTableModule,
    MatSortModule, 
    MatPaginatorModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    NgFor,
  ],
  templateUrl: './batting-leaderboard.component.html',
  styleUrl: './batting-leaderboard.component.css'
})
export class BattingLeaderboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['rank','player', 'org_abbreviation', 'games', 'at_bats', 'runs', 'hits', 'doubles', 'triples', 'home_runs', 'bases_on_balls', 'strikeouts', 'stolen_bases', 'caught_stealing', 'avg', 'slg'] 
  dataSource = new MatTableDataSource<any>([]);
  years = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2001, 2000];
  selectedYear = 2024;  // default year

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private leaderboardService: LeaderboardService) {
    console.log('years:', this.years);
  }

  ngOnInit() {
    this.loadBattingLeaderboard();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
    // filter by player name
    this.dataSource.filterPredicate = (data, filter) => {
      const name = `${data.player.name_use} ${data.player.name_last}`.toLowerCase();
      return name.includes(filter);
    }

    // apply filter
    this.dataSource.filter = filterValue;

    // reset paginator
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadBattingLeaderboard(year?: number): void {
    console.log('selected year:', this.selectedYear);
    this.leaderboardService.getBattingLeaderboard(this.selectedYear).subscribe(data => {
      this.dataSource.data = data;
      
    });
    

  }

}
