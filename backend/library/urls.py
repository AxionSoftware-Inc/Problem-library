from rest_framework.routers import DefaultRouter

from .views import ProblemGroupViewSet, ProblemViewSet

router = DefaultRouter()
router.register("problem-groups", ProblemGroupViewSet, basename="problem-group")
router.register("problems", ProblemViewSet, basename="problem")

urlpatterns = router.urls
