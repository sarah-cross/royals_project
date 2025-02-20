import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { LeaderboardService } from '../../services/leaderboard.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-batting-leaderboard',
  standalone: true,
  imports: [ MatTableModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule],
  templateUrl: './batting-leaderboard.component.html',
  styleUrl: './batting-leaderboard.component.css'
})
export class BattingLeaderboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['rank','player', 'org_abbreviation', 'games', 'at_bats', 'runs', 'hits', 'doubles', 'triples', 'home_runs', 'bases_on_balls', 'strikeouts', 'stolen_bases', 'caught_stealing', 'avg', 'slg'] 
  dataSource = new MatTableDataSource<any>([]);
  selectedYear = 2024;  // default year

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit() {
    this.loadBattingLeaderboard();

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      //this.dataSource.sort.sortables = this.displayedColumns;
      console.log("DataSource Data:", this.dataSource.data);
      console.log("MatSort instance:", this.dataSource.sort);
    }, 100);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadBattingLeaderboard(year?: number): void {
    this.leaderboardService.getBattingLeaderboard(this.selectedYear).subscribe(data => {
      this.dataSource.data = data;
      
    });
    

  }

}
