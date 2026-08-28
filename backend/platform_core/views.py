from django.db import transaction
from django.db.models import Q
from rest_framework import filters, permissions, viewsets
from rest_framework.exceptions import PermissionDenied

from .models import (
    ActivityEvent,
    Artifact,
    ObjectReference,
    ObjectRevision,
    Project,
    ScientificObject,
)
from .serializers import (
    ActivityEventSerializer,
    ArtifactSerializer,
    ObjectReferenceSerializer,
    ObjectRevisionSerializer,
    ProjectSerializer,
    ScientificObjectSerializer,
)


class ProjectAccessMixin:
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @staticmethod
    def readable_projects(user):
        if user.is_authenticated:
            return Project.objects.filter(
                Q(owner=user) | Q(visibility=Project.VISIBILITY_PUBLIC)
            ).distinct()
        return Project.objects.filter(visibility=Project.VISIBILITY_PUBLIC)

    @staticmethod
    def require_project_owner(user, project: Project):
        if not user.is_authenticated or project.owner_id != user.id:
            raise PermissionDenied("This project is not writable by the current user.")


class ProjectViewSet(ProjectAccessMixin, viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "description", "slug"]
    ordering_fields = ["created_at", "updated_at", "title"]
    ordering = ["-updated_at"]

    def get_queryset(self):
        return self.readable_projects(self.request.user)

    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            raise PermissionDenied("Sign in before syncing a project.")
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        self.require_project_owner(self.request.user, serializer.instance)
        serializer.save()

    def perform_destroy(self, instance):
        self.require_project_owner(self.request.user, instance)
        instance.delete()


class ScientificObjectViewSet(ProjectAccessMixin, viewsets.ModelViewSet):
    serializer_class = ScientificObjectSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "kind", "domain", "source_app"]
    ordering_fields = ["created_at", "updated_at", "title"]
    ordering = ["-updated_at"]

    def get_queryset(self):
        queryset = ScientificObject.objects.filter(
            project__in=self.readable_projects(self.request.user)
        ).select_related("project")
        project_id = self.request.query_params.get("project")
        kind = self.request.query_params.get("kind")
        source_app = self.request.query_params.get("source_app")
        if project_id:
            queryset = queryset.filter(project_id=project_id)
        if kind:
            queryset = queryset.filter(kind=kind)
        if source_app:
            queryset = queryset.filter(source_app=source_app)
        return queryset

    def perform_create(self, serializer):
        project = serializer.validated_data["project"]
        self.require_project_owner(self.request.user, project)
        serializer.save()

    def perform_update(self, serializer):
        self.require_project_owner(self.request.user, serializer.instance.project)
        serializer.save()

    def perform_destroy(self, instance):
        self.require_project_owner(self.request.user, instance.project)
        instance.delete()


class ObjectRevisionViewSet(ProjectAccessMixin, viewsets.ModelViewSet):
    serializer_class = ObjectRevisionSerializer
    http_method_names = ["get", "post", "head", "options"]

    def get_queryset(self):
        queryset = ObjectRevision.objects.filter(
            scientific_object__project__in=self.readable_projects(self.request.user)
        ).select_related("scientific_object", "scientific_object__project")
        object_id = self.request.query_params.get("object")
        if object_id:
            queryset = queryset.filter(scientific_object_id=object_id)
        return queryset

    @transaction.atomic
    def perform_create(self, serializer):
        scientific_object = serializer.validated_data["scientific_object"]
        self.require_project_owner(self.request.user, scientific_object.project)
        latest = (
            ObjectRevision.objects.filter(scientific_object=scientific_object)
            .order_by("-revision")
            .first()
        )
        next_revision = 1 if latest is None else latest.revision + 1
        serializer.save(
            revision=next_revision,
            created_by=self.request.user if self.request.user.is_authenticated else None,
        )
        scientific_object.current_revision = next_revision
        scientific_object.save(update_fields=["current_revision", "updated_at"])


class ObjectReferenceViewSet(ProjectAccessMixin, viewsets.ModelViewSet):
    serializer_class = ObjectReferenceSerializer

    def get_queryset(self):
        queryset = ObjectReference.objects.filter(
            project__in=self.readable_projects(self.request.user)
        ).select_related("project", "container_object", "referenced_object")
        project_id = self.request.query_params.get("project")
        referenced_object = self.request.query_params.get("referenced_object")
        if project_id:
            queryset = queryset.filter(project_id=project_id)
        if referenced_object:
            queryset = queryset.filter(referenced_object_id=referenced_object)
        return queryset

    def perform_create(self, serializer):
        project = serializer.validated_data["project"]
        self.require_project_owner(self.request.user, project)
        referenced_object = serializer.validated_data["referenced_object"]
        container_object = serializer.validated_data.get("container_object")
        if referenced_object.project_id != project.id:
            raise PermissionDenied("Referenced objects must belong to the same project in v1.")
        if container_object is not None and container_object.project_id != project.id:
            raise PermissionDenied("Container objects must belong to the same project in v1.")
        serializer.save()


class ArtifactViewSet(ProjectAccessMixin, viewsets.ModelViewSet):
    serializer_class = ArtifactSerializer

    def get_queryset(self):
        queryset = Artifact.objects.filter(
            revision__scientific_object__project__in=self.readable_projects(self.request.user)
        ).select_related("revision", "revision__scientific_object")
        revision_id = self.request.query_params.get("revision")
        if revision_id:
            queryset = queryset.filter(revision_id=revision_id)
        return queryset

    def perform_create(self, serializer):
        revision = serializer.validated_data["revision"]
        self.require_project_owner(self.request.user, revision.scientific_object.project)
        serializer.save()


class ActivityEventViewSet(ProjectAccessMixin, viewsets.ReadOnlyModelViewSet):
    serializer_class = ActivityEventSerializer

    def get_queryset(self):
        queryset = ActivityEvent.objects.filter(
            project__in=self.readable_projects(self.request.user)
        ).select_related("project", "actor")
        project_id = self.request.query_params.get("project")
        if project_id:
            queryset = queryset.filter(project_id=project_id)
        return queryset
