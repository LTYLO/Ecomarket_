from rest_framework import serializers
from .models import Reseña

class ReseñaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reseña
        fields = ['id', 'descripcion', 'fecha_creacion']
        read_only_fields = ['id', 'fecha_creacion']

class ReseñaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reseña
        fields = ['descripcion']