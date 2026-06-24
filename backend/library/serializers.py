from rest_framework import serializers

from .models import Problem, ProblemGroup, Project


class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = [
            "id",
            "external_id",
            "title",
            "slug",
            "topic",
            "difficulty",
            "duration",
            "summary",
            "tags",
            "formulas",
            "calculations",
            "graphs",
            "code_samples",
            "notes",
        ]


class ProblemGroupListSerializer(serializers.ModelSerializer):
    problems_count = serializers.IntegerField(source="problems.count", read_only=True)
    easy_count = serializers.SerializerMethodField()
    medium_count = serializers.SerializerMethodField()
    hard_count = serializers.SerializerMethodField()

    class Meta:
        model = ProblemGroup
        fields = [
            "id",
            "slug",
            "title",
            "topic",
            "difficulty",
            "description",
            "problems_count",
            "easy_count",
            "medium_count",
            "hard_count",
        ]

    def get_easy_count(self, obj: ProblemGroup) -> int:
        return obj.problems.filter(difficulty="Easy").count()

    def get_medium_count(self, obj: ProblemGroup) -> int:
        return obj.problems.filter(difficulty__icontains="Medium").count()

    def get_hard_count(self, obj: ProblemGroup) -> int:
        return obj.problems.filter(difficulty="Hard").count()


class ProblemGroupDetailSerializer(ProblemGroupListSerializer):
    problems = ProblemSerializer(many=True, read_only=True)

    class Meta(ProblemGroupListSerializer.Meta):
        fields = ProblemGroupListSerializer.Meta.fields + ["problems"]


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "id",
            "slug",
            "title",
            "topic",
            "difficulty",
            "description",
            "status",
            "created_at",
            "updated_at",
        ]
