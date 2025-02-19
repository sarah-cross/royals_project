from django.shortcuts import render
from rest_framework import viewsets
from .models import Player, BattingStats, PitchingStats
from .serializers import PlayerSerializer, BattingStatsSerializer, PitchingStatsSerializer


class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer


class BattingStatsViewSet(viewsets.ModelViewSet):
    queryset = BattingStats.objects.all()
    serializer_class = BattingStatsSerializer
    

class PitchingStatsViewSet(viewsets.ModelViewSet):
    queryset = PitchingStats.objects.all()
    serializer_class = PitchingStatsSerializer
    