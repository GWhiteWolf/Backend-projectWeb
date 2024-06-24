from django import forms
from .models import MensajeContacto, Marca, UserProfile
from django.contrib.auth.models import User
from django.forms import ModelForm
from django.core.validators import EmailValidator
from django.contrib.auth.forms import AuthenticationForm

# Register your models here.

class MarcaForm(ModelForm):
    class Meta:
        model = Marca
        fields = "__all__"

class LoginForm(AuthenticationForm):
    username = forms.CharField(label="Nombre de usuario o correo electrónico")

class UserRegistrationForm(ModelForm):
    direccion = forms.CharField(
        max_length=255,
        required=True,
        label="Dirección",
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Dirección'
        })
    )
    password1 = forms.CharField(
        label='Contraseña',
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Contraseña'
        })
    )
    password2 = forms.CharField(
        label='Confirmar Contraseña',
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Confirmar Contraseña'
        })
    )
    email = forms.EmailField(
        required=True,
        label="Correo Electrónico",
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Correo Electrónico'
        })
    )
    username = forms.CharField(
        label="Nombre de Usuario",
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Nombre de Usuario'
        })
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'direccion']
        labels = {
            'username': 'Nombre de Usuario',
        }

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Las contraseñas no coinciden")
        return password2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user
    
class ContactForm(forms.ModelForm):
    class Meta:
        model = MensajeContacto
        fields = ['email', 'asunto', 'mensaje']