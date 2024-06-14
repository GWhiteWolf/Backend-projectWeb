#from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    path('index', views.index, name='index'),
    path('crud', views.crud, name='crud'),
    path('productosAdd', views.productosAdd, name='productosAdd'),
    path('productos_del/<str:pk>/', views.productos_del, name='productos_del'),
    path('productos_findEdit <str:pk>', views.productos_findEdit, name='productos_findEdit'),
    path('productosUpdate', views.productosUpdate, name='productosUpdate'),
]
