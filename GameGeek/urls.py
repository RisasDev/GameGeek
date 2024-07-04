from django.urls import path
from . import views, apis
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('', views.index, name='index'),
    path('pages/despacho', views.despacho, name='despacho'),
    path('pages/register', views.register, name='register'),
    path('pages/post-register', views.post_register, name='post-register'),
    path('pages/productos/<str:categoria>', views.productos, name='productos'),
    path('pages/password-recovery', views.password_recovery, name='password-recovery'),
    path('pages/terms', views.terms, name='terms'),
    path('pages/privacy', views.privacy, name='privacy'),
    path('api/login', csrf_exempt(apis.iniciar_sesion), name='api/login'),
    path('api/register', csrf_exempt(apis.registrarse), name='api/register'),
    path('api/logout', csrf_exempt(apis.cerrar_sesion), name='api/logout'),
    path('dashboard/gestion', views.gestion, name='gestion'),
    path('account/profile', views.profile, name='profile'),
    path('account/shop-cart', views.shop_cart, name='shop-cart'),
    path('account/orders', views.orders, name='orders'),
    path('account/pays', views.pays, name='pays')
]