from django.contrib import admin
from .models import Reseña

@admin.register(Reseña)
class ReseñaAdmin(admin.ModelAdmin):
    list_display = ('descripcion_corta', 'fecha_creacion')
    list_filter = ('fecha_creacion',)
    search_fields = ('descripcion',)
    readonly_fields = ('fecha_creacion',)
    
    def descripcion_corta(self, obj):
        return obj.descripcion[:50] + "..." if len(obj.descripcion) > 50 else obj.descripcion
    descripcion_corta.short_description = "Descripción"