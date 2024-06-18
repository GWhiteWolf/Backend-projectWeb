from django.db import models
from django.contrib.auth.models import User

class Marca(models.Model):
    id_marca = models.AutoField(db_column='idMarca', primary_key=True)
    marca = models.CharField(max_length=20, blank=False, null=False)

    def __str__(self):
        return self.marca

class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    precio = models.IntegerField()
    imagen = models.ImageField(upload_to='productos/', default='productos/producto-1.png')
    color = models.CharField(max_length=30, blank=True, null=True)
    descripcion = models.TextField(max_length=200, blank=True, null=True)
    id_marca = models.ForeignKey(Marca, on_delete=models.CASCADE, db_column='idMarca')

    def __str__(self):
        return self.nombre

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    direccion = models.CharField(max_length=255)

    def __str__(self):
        return self.user.username

class MensajeContacto(models.Model):
    id_mensaje = models.AutoField(primary_key=True)
    email = models.EmailField()
    asunto = models.CharField(max_length=100)
    mensaje = models.TextField()

    def __str__(self):
        return self.asunto

class Venta(models.Model):
    id_venta = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    total = models.IntegerField()

    def __str__(self):
        return f'Venta {self.id_venta} - {self.usuario.username}'

class DetalleVenta(models.Model):
    id_venta = models.ForeignKey(Venta, related_name='productos', on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    precio = models.IntegerField()

    def __str__(self):
        return f'{self.cantidad} x {self.producto.nombre} en Venta {self.id_venta.id_venta}'

