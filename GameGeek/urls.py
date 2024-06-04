from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('pages/despacho.html', views.despacho, name='despacho'),
    path('pages/registro.html', views.registro, name='registro'),
    path('pages/peluches.html', views.peluches, name='peluches'),
    path('pages/pines.html', views.pines, name='pines'),
    path('pages/figuras.html', views.figuras, name='figuras')
]