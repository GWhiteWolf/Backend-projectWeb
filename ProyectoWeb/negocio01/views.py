from django.shortcuts import render
from django.shortcuts import render
from .models import Producto, Marca

# Create your views here.

def index(request):
    productos = Producto.objects.all()  # Obtener todos los productos de la base de datos
    context = {'productos': productos}
    return render(request, 'negocio01/index.html', context)

def crud(request):
    productos = Producto.objects.all()  # Obtener todos los productos de la base de datos
    context = {'productos': productos}
    return render(request, 'negocio01/productos_list.html', context)

def productosAdd(request):
    if request.method is not "POST":
        marca = Marca.objects.all()
        context = {'marcas':marca}
        return render(request, 'negocio01/productos_add.html',context)
    else:
        nombre = request.POST['nombre']
        precio = request.POST['precio']
        imagen = request.FILES['imagen']
        marca = request.POST['marca']

        objetoMarca = Marca.objects.get(id_marca=marca)
        objetoProducto = Producto(nombre=nombre,
                                precio=precio,
                                imagen=imagen, 
                                id_marca=marca)
        
        objetoProducto.save()
        context = {'mensaje':'Producto guardado'}
        return render(request, 'negocio01/productos_add.html', context)