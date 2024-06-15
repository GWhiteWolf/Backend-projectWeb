from django import forms
from .models import Producto, Usuario, MensajeContacto, Venta, DetalleVenta, Marca
from django.forms import ModelForm

# Register your models here.

class MarcaForm(ModelForm):
    class Meta:
        model = Marca
        fields = "__all__"

