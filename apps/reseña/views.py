from rest_framework import viewsets, filters
from .models import Reseña
from .serializers import ReseñaSerializer, ReseñaCreateSerializer

class ReseñaViewSet(viewsets.ModelViewSet):
    queryset = Reseña.objects.all().order_by('-fecha_creacion')
    serializer_class = ReseñaSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['descripcion']
    
    def get_serializer_class(self):
        if self.action == 'create':
            return ReseñaCreateSerializer
        return ReseñaSerializer