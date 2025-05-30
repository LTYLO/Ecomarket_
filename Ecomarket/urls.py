from django.contrib import admin
from django.urls import path, re_path,include
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('apps.products.url')),
    path('api/users/', include('apps.users.url')),
    path('api/reseña/', include('apps.reseña.url')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', TemplateView.as_view(template_name='index.html')),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
