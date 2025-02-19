from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlayerViewSet, BattingStatsViewSet, PitchingStatsViewSet, batting_leaderboard, pitching_leaderboard

router = DefaultRouter()
router.register(r'players', PlayerViewSet)
router.register(r'batting-stats', BattingStatsViewSet)
router.register(r'pitching-stats', PitchingStatsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('batting-leaderboard/', batting_leaderboard, name='batting-leaderboard'), 
    path('pitching-leaderboard/', pitching_leaderboard, name='pitching-leaderboard'),
]