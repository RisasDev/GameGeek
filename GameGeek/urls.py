from django.urls import path
from . import views, apis
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('', views.index, name='index'),
    path('pages/despacho.html', views.despacho, name='despacho'),
    path('pages/create-account.html', views.createAccount, name='create-account'),
    path('pages/peluches.html', views.peluches, name='peluches'),
    path('pages/pines.html', views.pines, name='pines'),
    path('pages/figuras.html', views.figuras, name='figuras'),
    path('pages/password-recovery.html', views.password_recovery, name='password-recovery'),
    path('pages/terms.html', views.terms, name='terms'),
    path('pages/privacy.html', views.privacy, name='privacy'),
    path('api/login', csrf_exempt(apis.login), name='login'),
]