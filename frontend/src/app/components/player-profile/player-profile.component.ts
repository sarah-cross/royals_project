import { Component } from '@angular/core';
import { StatsService } from '../../services/stats.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-player-profile',
  imports: [
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './player-profile.component.html',
  styleUrl: './player-profile.component.css'
})
export class PlayerProfileComponent implements OnInit {
  player: any;

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
      console.log('player data:', this.player);
    });
    
  }

}
