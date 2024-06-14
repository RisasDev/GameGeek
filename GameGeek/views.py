from django.shortcuts import render
from .models import Usuario

# Create your views here.

def index(request):
    return render(request, 'pages/index.html')

def despacho(request):
    return render(request, 'pages/despacho.html')

def registro(request):
    if request.method == "POST":
        objUser = Usuario.objects.create(
            rut=request.POST["rut"],
            nombre=request.POST["nombre"],
            apellido=request.POST["apellido"],
            telefono=request.POST["telefono"],
            email=request.POST["email"],
            password=request.POST["password"],
            activo=True,
        )

        objUser.save()
    return render(request, 'pages/registro.html')

def peluches(request):
    return render(request, 'pages/peluches.html')

def pines(request):
    return render(request, 'pages/pines.html')

def figuras(request):
    return render(request, 'pages/figuras.html')

def password_recovery(request):
    return render(request, 'pages/password-recovery.html')

def tos(request):
    return render(request, 'pages/tos.html')

def privacidad(request):
    return render(request, 'pages/privacidad.html')