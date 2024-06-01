from django.shortcuts import render
from django.shortcuts import render
from .models import Producto

# Create your views here.

def index(request):
    productos = Producto.objects.all()  # Obtener todos los productos de la base de datos# Calcular el total del carrito (si es necesario)
    return render(request, 'negocio01/index.html', {'productos': productos})

