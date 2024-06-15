from django.contrib import admin
from .models import Marca, Producto, Usuario, MensajeContacto, Venta, DetalleVenta

# Register your models here.
admin.site.register(Marca)
admin.site.register(Producto)
admin.site.register(Usuario)
admin.site.register(MensajeContacto)
admin.site.register(Venta)
admin.site.register(DetalleVenta)


