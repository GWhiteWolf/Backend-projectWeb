from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponseRedirect
from .models import Producto, Marca
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth import login, authenticate
from django.contrib import messages
from .forms import MarcaForm, UserRegistrationForm
from django.contrib.auth import views as auth_views


# Create your views here.

def index(request):
    productos = Producto.objects.all()  # Obtener todos los productos de la base de datos
    context = {'productos': productos}
    return render(request, 'negocio01/index.html', context)

def crud(request):
    productos = Producto.objects.all()  # Obtener todos los productos de la base de datos
    context = {'productos': productos}
    return render(request, 'negocio01/productos_list.html', context)

@login_required
def menu(request):
    usuario = request.user
    context = {'usuario': usuario}
    return render(request, 'negocio01/index.html', context)



def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            user_profile = user.userprofile
            user_profile.direccion = form.cleaned_data.get('direccion')
            user_profile.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            login(request, user)
            messages.success(request, 'Usuario registrado correctamente. Bienvenido!')
            return redirect('index')
        else:
            messages.error(request, 'Error al registrar usuario. Intente nuevamente.')
    else:
        form = UserRegistrationForm()
    return render(request, 'registration/register.html', {'form': form})


@login_required
@permission_required('negocio01.add_producto', raise_exception=True)
def productosAdd(request):
    if request.method != "POST":
        marca = Marca.objects.all()
        context = {'marcas':marca}
        return render(request, 'negocio01/productos_add.html',context)
    else:
        nombre = request.POST['nombre']
        precio = request.POST['precio']
        imagen = request.FILES.get('imagen', 'productos/producto-1.png')
        color = request.POST['color']
        descripcion = request.POST['descripcion']
        marca = request.POST['id_marca']

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
    

@login_required
@permission_required('negocio01.delete_producto', raise_exception=True)
def productos_del(request, pk):
    context = {}
    try:
        producto = Producto.objects.get(id_producto=pk)
        producto.delete()
        mensaje = 'Producto eliminado'
        productos = Producto.objects.all()
        context = {'productos': productos, 'mensaje': mensaje} 
        return render(request, 'negocio01/productos_list.html', context)
    except:
        mensaje = 'Error al eliminar producto'
        productos = Producto.objects.all()
        context = {'productos': productos, 'mensaje': mensaje}  
        return render(request, 'negocio01/productos_list.html', context)

@login_required
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

@login_required
@permission_required('negocio01.change_producto', raise_exception=True)
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
        imagen_nueva = request.FILES.get('imagen')
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


@login_required
def crud_marca(request):
    marcas = Marca.objects.all()
    context = {'marcas': marcas}
    print("enviando datos marcas_list")
    return render(request, 'negocio01/marcas_list.html', context)

@login_required
@permission_required('negocio01.add_marca', raise_exception=True)
def marcasAdd(request):
    context = {}

    if request.method == "POST":
        form = MarcaForm(request.POST)
        if form.is_valid():
            form.save()

            form = MarcaForm()

            context = {'mensaje': 'Marca guardada', 'form': form}
            return render(request, 'negocio01/marcas_add.html', context)
    else:
        form = MarcaForm()
        context = {'form': form}
        return render(request, 'negocio01/marcas_add.html', context)
    

@login_required
@permission_required('negocio01.delete_marca', raise_exception=True)
def marcas_del(request, pk):
    mensajes = []
    errores = []
    marcas = Marca.objects.all()
    try:
        marca=Marca.objects.get(id_marca=pk)
        context = {}
        if marca:
            marca.delete()
            mensajes.append('Marca eliminada')
            context = {'marcas': marcas, 'mensajes': mensajes, 'errores': errores}
            return render(request, 'negocio01/marcas_list.html', context)
    except:
        marcas=Marca.objects.all()
        mensaje='Error al eliminar marca'
        context = {'marcas': marcas, 'mensaje': mensaje}
        return render(request, 'negocio01/marcas_list.html', context)
    
@login_required
@permission_required('negocio01.change_marca', raise_exception=True)
def marcas_edit(request, pk):
    try:
        marca = Marca.objects.get(id_marca=pk)
        context = {}
        if marca:
            if request.method == "POST":
                form = MarcaForm(request.POST, instance=marca)
                form.save()
                mensaje='Marca actualizada'
                context = {'marca': marca, form: form, 'mensaje': mensaje}
                return render(request, 'negocio01/marcas_edit.html', context)
            else:
                form = MarcaForm(instance=marca)
                mensaje= ''
                context = {'marca': marca, 'form': form, 'mensaje': mensaje}
                return render(request, 'negocio01/marcas_edit.html', context)
    except:
        marcas = Marca.objects.all()
        mensaje = 'Error al editar marca'
        context = {'marcas': marcas, 'mensaje': mensaje}
        return render(request, 'negocio01/marcas_list.html', context)