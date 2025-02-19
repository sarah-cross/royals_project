from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Player, BattingStats, PitchingStats
from .serializers import PlayerSerializer, BattingStatsSerializer, PitchingStatsSerializer


class PlayerViewSet(viewsets.ModelViewSet):
    # Prefectch to batch fetch related stats
    queryset = Player.objects.prefetch_related('batting_stats', 'pitching_stats').all()
    serializer_class = PlayerSerializer


class BattingStatsViewSet(viewsets.ModelViewSet):
    # Get batting stats and player info in single query
    queryset = BattingStats.objects.select_related('player').all()
    serializer_class = BattingStatsSerializer
    

class PitchingStatsViewSet(viewsets.ModelViewSet):
    # Get pitching stats and player info in single query
    queryset = PitchingStats.objects.select_related('player').all()
    serializer_class = PitchingStatsSerializer
    

# Custom view for batting leaderboard
@api_view(["GET"])
def batting_leaderboard(request):
    year = request.GET.get('year')
    queryset = BattingStats.objects.select_related('player')

    # filter by year
    if year: 
        queryset = queryset.filter(year=year)

    serializer = BattingStatsSerializer(queryset, many=True)

    # sort by highest batting average
    sorted_data = sorted(serializer.data, key=lambda x: x["avg"], reverse=True)

    return Response(sorted_data)


# Custom view for pitching leaderboard
@api_view(["GET"])
def pitching_leaderboard(request): 
    year = request.GET.get('year')
    queryset = PitchingStats.objects.select_related('player')

    # filter by year
    if year: 
        queryset = queryset.filter(year=year)

    serializer = PitchingStatsSerializer(queryset, many=True)

    # sort by lowest whip
    sorted_data = sorted(serializer.data, key=lambda x: x["whip"])

    return Response(sorted_data)