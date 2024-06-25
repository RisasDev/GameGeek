from django.shortcuts import render
from .models import Usuario, Direccion

# Create your views here.

def index(request):
    return render(request, 'pages/index.html')

def despacho(request):
    return render(request, 'pages/despacho.html')

def register(request):
    return render(request, 'pages/register.html')

def post_register(request):
    return render(request, 'pages/post-register.html')

def peluches(request):
    return render(request, 'pages/peluches.html')

def pines(request):
    return render(request, 'pages/pines.html')

def figuras(request):
    return render(request, 'pages/figuras.html')

def password_recovery(request):
    return render(request, 'pages/password-recovery.html')

def terms(request):
    return render(request, 'pages/terms.html')

def privacy(request):
    return render(request, 'pages/privacy.html')