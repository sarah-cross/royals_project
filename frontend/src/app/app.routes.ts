import { Routes } from '@angular/router';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { PlayerProfileComponent } from './components/player-profile/player-profile.component';



export const routes: Routes = [
    { path: 'leaderboard', component: LeaderboardComponent }, 
    { path: 'player/:id', component: PlayerProfileComponent},
    { path: '', redirectTo: '/leaderboard', pathMatch: 'full'}
];
