# Hand-authored initial migration for the ecosystem-v1 Platform Core.
# Keep semantic changes synchronized with docs/SCIENTIFIC_OBJECT_SPEC.md.

import uuid

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Project",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("title", models.CharField(max_length=255)),
                ("slug", models.SlugField(blank=True, max_length=255)),
                ("description", models.TextField(blank=True)),
                (
                    "visibility",
                    models.CharField(
                        choices=[("private", "Private"), ("unlisted", "Unlisted"), ("public", "Public")],
                        default="private",
                        max_length=20,
                    ),
                ),
                ("metadata", models.JSONField(blank=True, default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "owner",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="science_projects",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={"ordering": ["-updated_at"]},
        ),
        migrations.CreateModel(
            name="ScientificObject",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("kind", models.CharField(max_length=80)),
                ("domain", models.CharField(blank=True, max_length=160)),
                ("schema_version", models.CharField(default="1.0", max_length=32)),
                ("title", models.CharField(max_length=255)),
                ("source_app", models.CharField(max_length=80)),
                ("current_revision", models.PositiveIntegerField(default=0)),
                ("metadata", models.JSONField(blank=True, default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "project",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="scientific_objects",
                        to="platform_core.project",
                    ),
                ),
            ],
            options={"ordering": ["-updated_at"]},
        ),
        migrations.CreateModel(
            name="ObjectRevision",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("revision", models.PositiveIntegerField()),
                ("payload", models.JSONField(default=dict)),
                ("provenance", models.JSONField(default=dict)),
                ("content_hash", models.CharField(blank=True, max_length=128)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "created_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="science_object_revisions",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "scientific_object",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="revisions",
                        to="platform_core.scientificobject",
                    ),
                ),
            ],
            options={"ordering": ["-revision"]},
        ),
        migrations.CreateModel(
            name="ObjectReference",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                (
                    "mode",
                    models.CharField(
                        choices=[("live", "Live"), ("pinned", "Pinned"), ("frozen", "Frozen")],
                        default="live",
                        max_length=20,
                    ),
                ),
                ("revision", models.PositiveIntegerField(blank=True, null=True)),
                ("snapshot_id", models.CharField(blank=True, max_length=160)),
                ("role", models.CharField(blank=True, max_length=80)),
                ("metadata", models.JSONField(blank=True, default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "container_object",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="outgoing_references",
                        to="platform_core.scientificobject",
                    ),
                ),
                (
                    "project",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="object_references",
                        to="platform_core.project",
                    ),
                ),
                (
                    "referenced_object",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="incoming_references",
                        to="platform_core.scientificobject",
                    ),
                ),
            ],
            options={"ordering": ["-created_at"]},
        ),
        migrations.CreateModel(
            name="Artifact",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("role", models.CharField(max_length=80)),
                ("media_type", models.CharField(blank=True, max_length=160)),
                ("uri", models.TextField()),
                ("content_hash", models.CharField(blank=True, max_length=128)),
                ("metadata", models.JSONField(blank=True, default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "revision",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="artifacts",
                        to="platform_core.objectrevision",
                    ),
                ),
            ],
            options={"ordering": ["created_at"]},
        ),
        migrations.CreateModel(
            name="ActivityEvent",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("event_type", models.CharField(max_length=100)),
                ("object_id", models.UUIDField(blank=True, null=True)),
                ("data", models.JSONField(blank=True, default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "actor",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="science_activity_events",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "project",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="activity_events",
                        to="platform_core.project",
                    ),
                ),
            ],
            options={"ordering": ["-created_at"]},
        ),
        migrations.AddConstraint(
            model_name="objectrevision",
            constraint=models.UniqueConstraint(
                fields=("scientific_object", "revision"),
                name="unique_scientific_object_revision",
            ),
        ),
        migrations.AddIndex(
            model_name="project",
            index=models.Index(fields=["owner", "updated_at"], name="platform_pr_owner_u_3a6295_idx"),
        ),
        migrations.AddIndex(
            model_name="project",
            index=models.Index(fields=["visibility", "updated_at"], name="platform_pr_visibil_0793fb_idx"),
        ),
        migrations.AddIndex(
            model_name="scientificobject",
            index=models.Index(fields=["project", "kind"], name="platform_sc_project_4cc5b8_idx"),
        ),
        migrations.AddIndex(
            model_name="scientificobject",
            index=models.Index(fields=["project", "source_app"], name="platform_sc_project_bf87bd_idx"),
        ),
        migrations.AddIndex(
            model_name="scientificobject",
            index=models.Index(fields=["domain"], name="platform_sc_domain_2cc429_idx"),
        ),
        migrations.AddIndex(
            model_name="objectrevision",
            index=models.Index(fields=["scientific_object", "revision"], name="platform_ob_scienti_e42112_idx"),
        ),
        migrations.AddIndex(
            model_name="objectreference",
            index=models.Index(fields=["project", "mode"], name="platform_ob_project_c99686_idx"),
        ),
        migrations.AddIndex(
            model_name="objectreference",
            index=models.Index(fields=["referenced_object"], name="platform_ob_referen_6a93ad_idx"),
        ),
        migrations.AddIndex(
            model_name="activityevent",
            index=models.Index(fields=["project", "created_at"], name="platform_ac_project_67faaa_idx"),
        ),
    ]
