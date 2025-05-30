from django.db import models

class Reseña(models.Model):
    descripcion = models.TextField(max_length=500)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Reseña"
        verbose_name_plural = "Reseñas"
        ordering = ['-fecha_creacion']
    
    def __str__(self):
        return self.descripcion[:50] + "..." if len(self.descripcion) > 50 else self.descripcion