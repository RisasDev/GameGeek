from django.shortcuts import render
from .models import Usuario

# Create your views here.

def index(request):
    return render(request, 'pages/index.html')

def despacho(request):
    return render(request, 'pages/despacho.html')

def registro(request):
    print(f"REQUEST: {request.method}")
    
    if request.method == "POST":
        objUser = Usuario.objects.create(
            rut=request.POST.get("rut", "default"),
            nombre=request.POST.get("nombre", "default"),
            apellido=request.POST.get("apellido", "default"),
            telefono=request.POST.get("telefono", "default"),
            email=request.POST.get("email", "default"),
            password=request.POST.get("password", "default"),
            activo=True,
        )

        objUser.save()

        context = {
            "mensaje": "Registro Exitoso",
        }
    else:
        context = {}
    return render(request, 'pages/registro.html', context)

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