from django.contrib import admin
from .models import Marca, Producto, MensajeContacto, Venta, DetalleVenta, UserProfile

# Register your models here.
admin.site.register(Marca)
admin.site.register(Producto)
admin.site.register(MensajeContacto)
admin.site.register(Venta)
admin.site.register(DetalleVenta)
admin.site.register(UserProfile)


