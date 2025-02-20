import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private base_url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { } // inject http in constructor to make api calls

  // get batting leaderboard data from backend
  getBattingLeaderboard(year?: number): Observable<any[]> {
    let url = `${this.base_url}/batting-leaderboard/`;
    if (year) url += `?year=${year}`;
    return this.http.get<any[]>(url);
  }

  // get pitching leaderboard data from backend
  getPitchingLeaderboard(year?: number): Observable<any[]> {
    let url = `${this.base_url}/pitching-leaderboard/`;
    if (year) url += `?year=${year}`;
    return this.http.get<any[]>(url);
  }
}
