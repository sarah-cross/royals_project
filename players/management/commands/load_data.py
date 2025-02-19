import json
import os
from django.core.management.base import BaseCommand
from players.models import Player, BattingStats, PitchingStats

# script to load JSON data to database
class Command(BaseCommand): 
    def handle(self, *args, **kwargs):
        
        # setup file path, open file
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        file_path = os.path.join(base_dir, "data", "players.json")
        with open(file_path, "r") as file: 
            data = json.load(file)

        # loop through player data 
        for player_data in data: 

            # get or create player 
            player, created = Player.objects.get_or_create(
                id=player_data["id"],
                name_first=player_data["name_first"],
                name_use=player_data["name_use"],
                name_last=player_data["name_last"],
                team=player_data["team"],
                birth_date=player_data["birth_date"], 
                height_feet=player_data["height_feet"],
                height_inches=player_data["height_inches"],
                weight=player_data["weight"],
                throws=player_data["throws"],
                bats=player_data["bats"],
                primary_position=player_data["primary_position"],
            )

            # get batting stats
            batting_stats = player_data.get("stats", {}).get("batting", [])
            for stat in batting_stats: 
                BattingStats.objects.create(
                    player=player,
                    year=stat["year"], 
                    league=stat["league"], 
                    org_abbreviation=stat["org_abbreviation"],
                    plate_appearances=stat["plate_appearances"], 
                    at_bats=stat["at_bats"], 
                    games=stat["games"],
                    games_started=stat["games_started"], 
                    runs=stat["runs"], 
                    hits=stat["hits"], 
                    doubles=stat["doubles"], 
                    triples=stat["triples"], 
                    home_runs=stat["home_runs"], 
                    bases_on_balls=stat["bases_on_balls"], 
                    strikeouts=stat["strikeouts"], 
                    sacrifices=stat["sacrifices"], 
                    sacrifice_flies=stat["sacrifice_flies"], 
                    stolen_bases=stat["stolen_bases"], 
                    caught_stealing=stat["caught_stealing"], 
                )

            # get pitching stats
            pitching_stats = player_data.get("stats", {}).get("pitching", [])
            for stat in pitching_stats: 
                PitchingStats.objects.create(
                    player=player,
                    year=stat["year"], 
                    league=stat["league"], 
                    org_abbreviation=stat["org_abbreviation"],
                    games=stat["games"], 
                    games_started=stat["games_started"], 
                    complete_games=stat["complete_games"], 
                    games_finished=stat["games_finished"], 
                    innings_pitched=stat["innings_pitched"], 
                    wins=stat["wins"], 
                    losses=stat["losses"], 
                    saves=stat["saves"], 
                    total_batters_faced=stat["total_batters_faced"], 
                    at_bats=stat["at_bats"], 
                    hits=stat["hits"], 
                    doubles=stat["doubles"], 
                    triples=stat["triples"], 
                    home_runs=stat["home_runs"], 
                    bases_on_balls=stat["bases_on_balls"], 
                    strikeouts=stat["strikeouts"], 
                )


        self.stdout.write(self.style.SUCCESS("Successfully loaded player data!"))