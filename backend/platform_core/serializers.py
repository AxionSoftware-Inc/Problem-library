from rest_framework import serializers

from .models import (
    ActivityEvent,
    Artifact,
    ObjectReference,
    ObjectRevision,
    Project,
    ScientificObject,
)


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "visibility",
            "metadata",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class ArtifactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artifact
        fields = [
            "id",
            "revision",
            "role",
            "media_type",
            "uri",
            "content_hash",
            "metadata",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class ObjectRevisionSerializer(serializers.ModelSerializer):
    artifacts = ArtifactSerializer(many=True, read_only=True)

    class Meta:
        model = ObjectRevision
        fields = [
            "id",
            "scientific_object",
            "revision",
            "payload",
            "provenance",
            "content_hash",
            "artifacts",
            "created_at",
        ]
        read_only_fields = ["id", "revision", "created_at"]


class ScientificObjectSerializer(serializers.ModelSerializer):
    latest_revision = serializers.SerializerMethodField()

    class Meta:
        model = ScientificObject
        fields = [
            "id",
            "project",
            "kind",
            "domain",
            "schema_version",
            "title",
            "source_app",
            "current_revision",
            "metadata",
            "latest_revision",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "current_revision",
            "latest_revision",
            "created_at",
            "updated_at",
        ]

    def get_latest_revision(self, instance):
        revision = instance.revisions.order_by("-revision").first()
        if revision is None:
            return None
        return ObjectRevisionSerializer(revision, context=self.context).data


class ObjectReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ObjectReference
        fields = [
            "id",
            "project",
            "container_object",
            "referenced_object",
            "mode",
            "revision",
            "snapshot_id",
            "role",
            "metadata",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def validate(self, attrs):
        mode = attrs.get("mode", getattr(self.instance, "mode", ObjectReference.MODE_LIVE))
        revision = attrs.get("revision", getattr(self.instance, "revision", None))
        snapshot_id = attrs.get("snapshot_id", getattr(self.instance, "snapshot_id", ""))

        if mode == ObjectReference.MODE_PINNED and revision is None:
            raise serializers.ValidationError({"revision": "Pinned references require a revision."})
        if mode == ObjectReference.MODE_FROZEN and not snapshot_id:
            raise serializers.ValidationError({"snapshot_id": "Frozen references require a snapshot id."})
        return attrs


class ActivityEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityEvent
        fields = ["id", "project", "event_type", "object_id", "data", "created_at"]
        read_only_fields = ["id", "created_at"]
