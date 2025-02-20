import { Component } from '@angular/core';
import { LeaderboardService } from '../../services/leaderboard.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-pitching-leaderboard',
  imports: [],
  templateUrl: './pitching-leaderboard.component.html',
  styleUrl: './pitching-leaderboard.component.css'
})
export class PitchingLeaderboardComponent implements OnInit {
  players: any[] = [];

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
      this.loadPitchingLeaderboard();
  }
  loadPitchingLeaderboard(year?: number): void {
    this.leaderboardService.getPitchingLeaderboard(year).subscribe(data => {
      this.players = data;
    });
  }
}
