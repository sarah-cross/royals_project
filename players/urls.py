from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlayerViewSet, BattingStatsViewSet, PitchingStatsViewSet

router = DefaultRouter()
router.register(r'players', PlayerViewSet)
router.register(r'batting-stats', BattingStatsViewSet)
router.register(r'pitching-stats', PitchingStatsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]