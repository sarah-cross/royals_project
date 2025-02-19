from rest_framework import serializers
from .models import Player, BattingStats, PitchingStats


class PlayerSerializer(serializers.ModelSerializer): 
    batting_stats = serializers.SerializerMethodField()
    pitching_stats = serializers.SerializerMethodField()

    class Meta: 
        model = Player
        fields = "__all__"

    def get_batting_stats(self, obj):
        return BattingStatsSerializer(obj.batting_stats.all(), many=True).data

    def get_pitching_stats(self, obj):
        return PitchingStatsSerializer(obj.pitching_stats.all(), many=True).data


class BattingStatsSerializer(serializers.ModelSerializer): 
    avg = serializers.SerializerMethodField()
    slg = serializers.SerializerMethodField()

    class Meta: 
        model = BattingStats
        fields = "__all__"

    # Calculate batting average
    def get_avg(self, obj):
        return round(obj.hits / obj.at_bats, 3) if obj.at_bats > 0 else 0.000

    # Calculate slugging percentage
    def get_slg(self, obj):
        total_bases = obj.hits + (2 * obj.doubles) + ( 3 * obj.triples) + (4 * obj.home_runs)
        return round(total_bases / obj.at_bats, 3) if obj.at_bats > 0 else 0.000


class PitchingStatsSerializer(serializers.ModelSerializer): 
    whip = serializers.SerializerMethodField()
    avg = serializers.SerializerMethodField()

    class Meta: 
        model = PitchingStats
        fields = "__all__"

    # Calculate whip
    def get_whip(self, obj):
        return round((obj.bases_on_balls + obj.hits) / obj.innings_pitched, 3) if obj.innings_pitched > 0 else 0.000

    # Calculate avg
    def get_avg(self, obj):
        return round(obj.hits / obj.at_bats, 3) if obj.at_bats > 0 else 0.000