import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattingLeaderboardComponent } from './batting-leaderboard.component';

describe('BattingLeaderboardComponent', () => {
  let component: BattingLeaderboardComponent;
  let fixture: ComponentFixture<BattingLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattingLeaderboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattingLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
