from django.db import models


class Player(models.Model):
    id = models.IntegerField(primary_key=True) # use the player's id as the primary key
    name_first = models.CharField(max_length=50)
    name_use = models.CharField(max_length=50, blank=True)
    name_last = models.CharField(max_length=50)
    team = models.CharField(max_length=10, null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    height_feet = models.IntegerField(null=True, blank=True)
    height_inches = models.IntegerField(null=True, blank=True)
    weight = models.IntegerField(null=True, blank=True)
    throws = models.CharField(max_length=1)
    bats = models.CharField(max_length=1)
    primary_position = models.CharField(max_length=2, null=True, blank=True)

    def __str__(self):
        return f"{self.name_first} {self.name_last}"


class BattingStats(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="batting_stats")
    year = models.IntegerField()
    league = models.CharField(max_length=2, null=True, blank=True)
    org_abbreviation = models.CharField(max_length=3)
    plate_appearances = models.IntegerField(default=0)
    at_bats = models.IntegerField(default=0)
    games = models.IntegerField(default=0)
    games_started = models.IntegerField(default=0)
    runs = models.IntegerField(default=0)
    hits = models.IntegerField(default=0)
    doubles = models.IntegerField(default=0)
    triples = models.IntegerField(default=0)
    home_runs = models.IntegerField(default=0)
    bases_on_balls = models.IntegerField(default=0)
    strikeouts = models.IntegerField(default=0)
    sacrifices = models.IntegerField(default=0)
    sacrifice_flies = models.IntegerField(default=0)
    stolen_bases = models.IntegerField(default=0)
    caught_stealing = models.IntegerField(default=0)
    
    def __str__(self):
        return f"{self.player.name_first} {self.player.name_last} - {self.year} Batting"



class PitchingStats(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="pitching_stats")
    year = models.IntegerField()
    league = models.CharField(max_length=2, null=True, blank=True)
    org_abbreviation = models.CharField(max_length=3)
    games = models.IntegerField(default=0)
    games_started = models.IntegerField(default=0)
    complete_games = models.IntegerField(default=0)
    games_finished = models.IntegerField(default=0)
    innings_pitched = models.FloatField(default=0.0)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    saves = models.IntegerField(default=0)
    total_batters_faced = models.IntegerField(default=0)
    at_bats = models.IntegerField(default=0)
    hits = models.IntegerField(default=0)
    doubles = models.IntegerField(default=0)
    triples = models.IntegerField(default=0)
    home_runs = models.IntegerField(default=0)
    bases_on_balls = models.IntegerField(default=0)
    strikeouts = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.player.name_first} {self.player.name_last} - {self.year} Pitching"
