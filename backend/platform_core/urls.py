from rest_framework.routers import DefaultRouter

from .views import (
    ActivityEventViewSet,
    ArtifactViewSet,
    ObjectReferenceViewSet,
    ObjectRevisionViewSet,
    ProjectViewSet,
    ScientificObjectViewSet,
)

router = DefaultRouter()
router.register("projects", ProjectViewSet, basename="platform-project")
router.register("objects", ScientificObjectViewSet, basename="scientific-object")
router.register("revisions", ObjectRevisionViewSet, basename="object-revision")
router.register("references", ObjectReferenceViewSet, basename="object-reference")
router.register("artifacts", ArtifactViewSet, basename="artifact")
router.register("activity", ActivityEventViewSet, basename="activity")

urlpatterns = router.urls
