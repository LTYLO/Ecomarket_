from rest_framework.routers import DefaultRouter
from .views import ReseñaViewSet

router = DefaultRouter()
router.register(r'', ReseñaViewSet, basename='reseña')

urlpatterns = router.urls