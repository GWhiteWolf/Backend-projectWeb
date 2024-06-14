from django.shortcuts import render, get_object_or_404
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
    if request.method != "POST":
        marca = Marca.objects.all()
        context = {'marcas':marca}
        return render(request, 'negocio01/productos_add.html',context)
    else:
        nombre = request.POST['nombre']
        precio = request.POST['precio']
        imagen = request.FILES.get("imagen", 'productos/producto-1.png')
        color = request.POST["color"]
        descripcion = request.POST["descripcion"]
        marca = request.POST["id_marca"]

        objetoMarca = Marca.objects.get(id_marca=marca)
        objetoProducto = Producto.objects.create(
            nombre=nombre,
            precio=precio,
            imagen=imagen, 
            color=color,
            descripcion=descripcion,
            id_marca=objetoMarca)
        
        objetoProducto.save()
        context = {'mensaje':'Producto guardado'}
        return render(request, 'negocio01/productos_add.html', context)
    

def productos_del(request, pk):
    context = {}
    try:
        producto = Producto.objects.get(id_producto=pk)
        producto.delete()
        mensaje = 'Producto eliminado'
        productos = Producto.objects.all()
        context = {'productos': productos, 'mensaje': mensaje}  # Corregido
        return render(request, 'negocio01/productos_list.html', context)
    except:
        mensaje = 'Error al eliminar producto'
        productos = Producto.objects.all()
        context = {'productos': productos, 'mensaje': mensaje}  # Corregido
        return render(request, 'negocio01/productos_list.html', context)

    
def productos_findEdit(request, pk):
    if pk != "":
        try:
            producto = Producto.objects.get(id_producto=pk)
            marcas = Marca.objects.all()

            # Verificar si producto.id_marca es válido antes de acceder a producto.id_marca.marca
            if producto and hasattr(producto.id_marca, 'marca'):
                context = {'producto': producto, 'marcas': marcas}
                return render(request, 'negocio01/productos_edit.html', context)
            else:
                context = {'mensaje': 'Producto no encontrado'}
                return render(request, 'negocio01/productos_edit.html', context)
        except Producto.DoesNotExist:
            context = {'mensaje': 'Producto no encontrado'}
            return render(request, 'negocio01/productos_edit.html', context)


def productosUpdate(request):
    if request.method == "POST":
        id_producto = request.POST.get("id_producto")

        # Obtener el objeto Producto desde la base de datos o devolver un error 404 si no existe
        producto = get_object_or_404(Producto, id_producto=id_producto)

        producto.nombre = request.POST.get('nombre')
        producto.precio = request.POST.get('precio')
        producto.color = request.POST.get("color")
        producto.descripcion = request.POST.get("descripcion")
        marca_id = request.POST.get("id_marca")
        imagen_nueva = request.FILES.get("imagen")
        if imagen_nueva:
            producto.imagen = imagen_nueva

        objetoMarca = get_object_or_404(Marca, id_marca=marca_id)
        producto.id_marca = objetoMarca

        producto.save()

        marcas = Marca.objects.all()

        context = {'mensaje': 'Producto actualizado', 'marcas': marcas}
        return render(request, 'negocio01/productos_edit.html', context)
    
    else:
        productos = Producto.objects.all()
        context = {'productos': productos}
        return render(request, 'negocio01/productos_list.html', context)
