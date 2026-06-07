from django.db import models


class ProblemGroup(models.Model):
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=255)
    topic = models.CharField(max_length=255)
    difficulty = models.CharField(max_length=100)
    description = models.TextField()

    class Meta:
        ordering = ["title"]

    def __str__(self) -> str:
        return self.title


class Problem(models.Model):
    group = models.ForeignKey(
        ProblemGroup,
        on_delete=models.CASCADE,
        related_name="problems",
    )
    external_id = models.PositiveIntegerField(unique=True)
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    topic = models.CharField(max_length=255)
    difficulty = models.CharField(max_length=100)
    duration = models.CharField(max_length=50)
    summary = models.TextField()
    tags = models.JSONField(default=list)

    class Meta:
        ordering = ["external_id"]

    def __str__(self) -> str:
        return self.title
