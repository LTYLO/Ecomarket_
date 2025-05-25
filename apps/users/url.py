# apps/users/urls.py
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet
from django.urls import path, include
from .views import EmailTokenObtainPairView

router = DefaultRouter()
router.register(r'', UsuarioViewSet)

urlpatterns = [
    path('token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
]

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import EmailTokenObtainPairSerializer

from apps.users.serializers import CustomTokenObtainPairSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
