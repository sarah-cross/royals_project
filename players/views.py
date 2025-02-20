from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Player, BattingStats, PitchingStats
from .serializers import PlayerSerializer, BattingStatsSerializer, PitchingStatsSerializer, PlayerStatsSerializer


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

    return Response(serializer.data)


# Custom view for pitching leaderboard
@api_view(["GET"])
def pitching_leaderboard(request): 
    year = request.GET.get('year')
    queryset = PitchingStats.objects.select_related('player')

    # filter by year
    if year: 
        queryset = queryset.filter(year=year)

    serializer = PitchingStatsSerializer(queryset, many=True)

    return Response(serializer.data)


# Get all stats for a player by ID
@api_view(["GET"])
def get_player(request, player_id):
    player = get_object_or_404(Player, id=player_id)
    serializer = PlayerStatsSerializer(player)

    return Response(serializer.data)