#from django.conf.urls import url
from django.urls import path
from . import views
from .views import custom_login

urlpatterns = [
    path('index', views.index, name='index'),
    path('crud', views.crud, name='crud'),
    path('productosAdd', views.productosAdd, name='productosAdd'),
    path('productos_del/<str:pk>/', views.productos_del, name='productos_del'),
    path('productos_findEdit <str:pk>', views.productos_findEdit, name='productos_findEdit'),
    path('productosUpdate', views.productosUpdate, name='productosUpdate'),

    path('crud_marcas', views.crud_marca, name='crud_marcas'),
    path('marcasAdd', views.marcasAdd, name='marcasAdd'),
    path('marcas_del/<str:pk>/', views.marcas_del, name='marcas_del'),
    path('marcas_edit/<str:pk>/', views.marcas_edit, name='marcas_edit'),
    path('contacto_add', views.contacto_add, name='contacto_add'),
    path('register/', views.register, name='register'),
    path('login/', custom_login, name='login'),
    path('logout/', views.logout_view, name='logout'),

    path('crud_mensajes', views.crud_mensajes, name='crud_mensajes'),
    path('mensaje_del/<int:pk>/', views.mensaje_del, name='mensaje_del'),
]
