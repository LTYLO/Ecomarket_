from django.db import models

class Product(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='product_images/')
    created_at = models.DateTimeField(auto_now_add=True)

    # Campos nutricionales con valores por defecto
    calories = models.DecimalField(
        max_digits=6, decimal_places=2, default=0,
        help_text="Calorías por 100g (kcal)"
    )
    vitamin_c = models.DecimalField(
        max_digits=5, decimal_places=2, default=0,
        help_text="Vitamina C (mg)"
    )
    fiber = models.DecimalField(
        max_digits=4, decimal_places=2, default=0,
        help_text="Fibra (g)"
    )
    potassium = models.DecimalField(
        max_digits=6, decimal_places=2, default=0,
        help_text="Potasio (mg)"
    )
    origin = models.CharField(
        max_length=100, default="Desconocido",
        help_text="Origen"
    )

    def __str__(self):
        return self.title
