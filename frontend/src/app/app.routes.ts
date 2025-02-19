import { Routes } from '@angular/router';
import { BattingLeaderboardComponent } from './components/batting-leaderboard/batting-leaderboard.component';
import { PitchingLeaderboardComponent } from './components/pitching-leaderboard/pitching-leaderboard.component';


export const routes: Routes = [
    { path: 'batting-leaderboard', component: BattingLeaderboardComponent }, 
    { path: 'pitching-leaderboard', component: PitchingLeaderboardComponent }, 
    { path: '', redirectTo: '/batting-leaderboard', pathMatch: 'full'}
];
