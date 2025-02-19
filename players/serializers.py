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
        return PitchingStatsSerializer(obj.batting_stats.all(), many=True).data


class BattingStatsSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = BattingStats
        fields = "__all__"


class PitchingStatsSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = PitchingStats
        fields = "__all__"