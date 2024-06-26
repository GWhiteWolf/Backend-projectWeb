from django import forms
from .models import MensajeContacto, Venta, DetalleVenta, Marca, UserProfile
from django.contrib.auth.models import User
from django.forms import ModelForm

# Register your models here.

class MarcaForm(ModelForm):
    class Meta:
        model = Marca
        fields = "__all__"


class UserRegistrationForm(forms.ModelForm):
    direccion = forms.CharField(max_length=255, required=True, label="Dirección")

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password'])
        if commit:
            user.save()
            
        return user