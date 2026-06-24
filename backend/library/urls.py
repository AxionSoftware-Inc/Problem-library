from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import ProblemGroupViewSet, ProblemViewSet, ProjectViewSet, overview

router = DefaultRouter()
router.register("problem-groups", ProblemGroupViewSet, basename="problem-group")
router.register("problems", ProblemViewSet, basename="problem")
router.register("projects", ProjectViewSet, basename="project")

urlpatterns = [path("", overview)] + router.urls
