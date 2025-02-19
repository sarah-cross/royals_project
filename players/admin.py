from django.contrib import admin
from .models import Player, BattingStats, PitchingStats

admin.site.register(Player)
admin.site.register(BattingStats)
admin.site.register(PitchingStats)

