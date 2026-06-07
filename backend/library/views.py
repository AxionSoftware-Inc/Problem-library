from django.db.models import Count, Q
from rest_framework import filters, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Problem, ProblemGroup
from .serializers import (
    ProblemGroupDetailSerializer,
    ProblemGroupListSerializer,
    ProblemSerializer,
)


class ProblemGroupViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProblemGroup.objects.all().prefetch_related("problems")
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "topic", "description", "problems__title", "problems__tags"]
    ordering_fields = ["title", "difficulty"]
    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProblemGroupDetailSerializer
        return ProblemGroupListSerializer

    @action(detail=False, methods=["get"])
    def stats(self, request):
        queryset = self.get_queryset().annotate(
            total_problems=Count("problems"),
            easy_count=Count("problems", filter=Q(problems__difficulty="Easy")),
            medium_count=Count(
                "problems", filter=Q(problems__difficulty__icontains="Medium")
            ),
            hard_count=Count("problems", filter=Q(problems__difficulty="Hard")),
        )
        payload = {
            "groups": queryset.count(),
            "problems": Problem.objects.count(),
            "easy": sum(item.easy_count for item in queryset),
            "medium": sum(item.medium_count for item in queryset),
            "hard": sum(item.hard_count for item in queryset),
        }
        return Response(payload)


class ProblemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Problem.objects.select_related("group").all()
    serializer_class = ProblemSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "topic", "summary", "tags", "group__title"]
    ordering_fields = ["external_id", "title", "difficulty"]

    def get_queryset(self):
        queryset = super().get_queryset()
        group_slug = self.request.query_params.get("group")
        difficulty = self.request.query_params.get("difficulty")
        topic = self.request.query_params.get("topic")

        if group_slug:
            queryset = queryset.filter(group__slug=group_slug)
        if difficulty:
            queryset = queryset.filter(difficulty__icontains=difficulty)
        if topic:
            queryset = queryset.filter(topic__iexact=topic)
        return queryset
