from django.contrib import admin

from .models import Problem, ProblemGroup


@admin.register(ProblemGroup)
class ProblemGroupAdmin(admin.ModelAdmin):
    list_display = ("title", "topic", "difficulty", "slug")
    search_fields = ("title", "topic", "difficulty", "slug")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Problem)
class ProblemAdmin(admin.ModelAdmin):
    list_display = ("title", "group", "difficulty", "duration", "external_id")
    list_filter = ("difficulty", "group")
    search_fields = ("title", "topic", "summary", "slug")
    prepopulated_fields = {"slug": ("title",)}
