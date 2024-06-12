#from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    path('index', views.index, name='index'),
    path('crud', views.crud, name='crud'),
    #path('productosAdd', views.productosAdd, name='productosAdd'),

]
