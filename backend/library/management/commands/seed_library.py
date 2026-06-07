import json
from pathlib import Path

from django.core.management.base import BaseCommand

from library.models import Problem, ProblemGroup


GROUPS = [
    {
        "slug": "array-string-patterns",
        "title": "Array and String Patterns",
        "difficulty": "Easy to Medium",
        "topic": "Arrays, strings, windows",
        "description": (
            "Sequence problems focused on indexing, counting, ordering, "
            "and compact state transitions."
        ),
    },
    {
        "slug": "stack-queue-flows",
        "title": "Stack and Queue Flows",
        "difficulty": "Easy to Hard",
        "topic": "Stacks, queues, parsing",
        "description": (
            "Problems where order, rollback, and streamed state control the solution shape."
        ),
    },
    {
        "slug": "graph-search-systems",
        "title": "Graph Search Systems",
        "difficulty": "Medium to Hard",
        "topic": "BFS, DFS, shortest path",
        "description": (
            "Traversal-heavy tasks and network-style problems with routing, "
            "dependencies, and state space."
        ),
    },
    {
        "slug": "dynamic-programming",
        "title": "Dynamic Programming",
        "difficulty": "Medium to Hard",
        "topic": "Optimization, counting, partitioning",
        "description": (
            "State-driven problems that reward careful transitions and reusable subproblem design."
        ),
    },
]


class Command(BaseCommand):
    help = "Seed problem groups and problems from the frontend JSON file."

    def handle(self, *args, **options):
        data_path = Path(__file__).resolve().parents[4] / "app" / "problems" / "problems.json"
        payload = json.loads(data_path.read_text())

        Problem.objects.all().delete()
        ProblemGroup.objects.all().delete()

        groups = {}
        for group_data in GROUPS:
            group = ProblemGroup.objects.create(**group_data)
            groups[group.slug] = group

        for item in payload:
            Problem.objects.create(
                group=groups[item["group"]],
                external_id=item["id"],
                title=item["title"],
                slug=item["slug"],
                topic=item["topic"],
                difficulty=item["difficulty"],
                duration=item["duration"],
                summary=item["summary"],
                tags=item["tags"],
            )

        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded {ProblemGroup.objects.count()} groups and {Problem.objects.count()} problems."
            )
        )
