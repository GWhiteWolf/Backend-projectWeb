from django.db import models

class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre      = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio      = models.DecimalField(max_digits=10, decimal_places=2)
    color       = models.CharField(max_length=50, null=True, blank=True)
    imagen      = models.ImageField(upload_to='productos/', default='productos/producto-1.png')

    def __str__(self):
        return self.nombre
    

class Usuario(models.Model):
    id_usuario  = models.AutoField(primary_key=True)
    nombre      = models.CharField(max_length=50)
    apellido    = models.CharField(max_length=50)
    direccion   = models.CharField(max_length=255)
    email       = models.EmailField(unique=True)
    password    = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.nombre} {self.apellido}'
    

class MensajeContacto(models.Model):
    id_mensaje  = models.AutoField(primary_key=True)
    email       = models.EmailField()
    asunto      = models.CharField(max_length=100)
    mensaje     = models.TextField()

    def __str__(self):
        return self.asunto    
    

