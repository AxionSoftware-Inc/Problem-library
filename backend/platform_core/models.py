import uuid

from django.conf import settings
from django.db import models


class Project(models.Model):
    VISIBILITY_PRIVATE = "private"
    VISIBILITY_UNLISTED = "unlisted"
    VISIBILITY_PUBLIC = "public"
    VISIBILITY_CHOICES = [
        (VISIBILITY_PRIVATE, "Private"),
        (VISIBILITY_UNLISTED, "Unlisted"),
        (VISIBILITY_PUBLIC, "Public"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="science_projects",
        null=True,
        blank=True,
    )
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    visibility = models.CharField(
        max_length=20,
        choices=VISIBILITY_CHOICES,
        default=VISIBILITY_PRIVATE,
    )
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]
        indexes = [
            models.Index(fields=["owner", "updated_at"]),
            models.Index(fields=["visibility", "updated_at"]),
        ]

    def __str__(self) -> str:
        return self.title


class ScientificObject(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="scientific_objects",
    )
    kind = models.CharField(max_length=80)
    domain = models.CharField(max_length=160, blank=True)
    schema_version = models.CharField(max_length=32, default="1.0")
    title = models.CharField(max_length=255)
    source_app = models.CharField(max_length=80)
    current_revision = models.PositiveIntegerField(default=0)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]
        indexes = [
            models.Index(fields=["project", "kind"]),
            models.Index(fields=["project", "source_app"]),
            models.Index(fields=["domain"]),
        ]

    def __str__(self) -> str:
        return f"{self.kind}: {self.title}"


class ObjectRevision(models.Model):
    scientific_object = models.ForeignKey(
        ScientificObject,
        on_delete=models.CASCADE,
        related_name="revisions",
    )
    revision = models.PositiveIntegerField()
    payload = models.JSONField(default=dict)
    provenance = models.JSONField(default=dict)
    content_hash = models.CharField(max_length=128, blank=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="science_object_revisions",
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-revision"]
        constraints = [
            models.UniqueConstraint(
                fields=["scientific_object", "revision"],
                name="unique_scientific_object_revision",
            )
        ]
        indexes = [models.Index(fields=["scientific_object", "revision"])]

    def __str__(self) -> str:
        return f"{self.scientific_object_id}@{self.revision}"


class ObjectReference(models.Model):
    MODE_LIVE = "live"
    MODE_PINNED = "pinned"
    MODE_FROZEN = "frozen"
    MODE_CHOICES = [
        (MODE_LIVE, "Live"),
        (MODE_PINNED, "Pinned"),
        (MODE_FROZEN, "Frozen"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="object_references",
    )
    container_object = models.ForeignKey(
        ScientificObject,
        on_delete=models.CASCADE,
        related_name="outgoing_references",
        null=True,
        blank=True,
    )
    referenced_object = models.ForeignKey(
        ScientificObject,
        on_delete=models.CASCADE,
        related_name="incoming_references",
    )
    mode = models.CharField(max_length=20, choices=MODE_CHOICES, default=MODE_LIVE)
    revision = models.PositiveIntegerField(null=True, blank=True)
    snapshot_id = models.CharField(max_length=160, blank=True)
    role = models.CharField(max_length=80, blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["project", "mode"]),
            models.Index(fields=["referenced_object"]),
        ]


class Artifact(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    revision = models.ForeignKey(
        ObjectRevision,
        on_delete=models.CASCADE,
        related_name="artifacts",
    )
    role = models.CharField(max_length=80)
    media_type = models.CharField(max_length=160, blank=True)
    uri = models.TextField()
    content_hash = models.CharField(max_length=128, blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]


class ActivityEvent(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="activity_events",
    )
    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="science_activity_events",
        null=True,
        blank=True,
    )
    event_type = models.CharField(max_length=100)
    object_id = models.UUIDField(null=True, blank=True)
    data = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [models.Index(fields=["project", "created_at"])]
