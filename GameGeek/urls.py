from django.urls import path
from . import views, apis
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('', views.index, name='index'),
    path('pages/despacho.html', views.despacho, name='despacho'),
    path('pages/register.html', views.register, name='register'),
    path('pages/post-register.html', views.post_register, name='post-register'),
    path('pages/peluches.html', views.peluches, name='peluches'),
    path('pages/pines.html', views.pines, name='pines'),
    path('pages/figuras.html', views.figuras, name='figuras'),
    path('pages/password-recovery.html', views.password_recovery, name='password-recovery'),
    path('pages/terms.html', views.terms, name='terms'),
    path('pages/privacy.html', views.privacy, name='privacy'),
    path('api/login', csrf_exempt(apis.iniciar_sesion), name='api/login'),
    path('api/register', csrf_exempt(apis.registrarse), name='api/register'),
    path('api/logout', csrf_exempt(apis.cerrar_sesion), name='api/logout')
]