from django.shortcuts import render
from .models import Usuario, Direccion

# Create your views here.

def index(request):
    return render(request, 'pages/index.html')

def despacho(request):
    return render(request, 'pages/despacho.html')

def registro(request):
    if request.method == "POST":
        rut = request.POST["rut"]
        objUserExists = Usuario.objects.filter(rut=rut).exists()
        
        if not objUserExists:
            objUser = Usuario.objects.create(
                rut=rut,
                nombre=request.POST["nombre"],
                apellido=request.POST["apellido"],
                telefono=request.POST["telefono"],
                email=request.POST["email"],
                password=request.POST["password"]
            )
            objUser.save()
            
            direccionDestinatario = request.POST["destinatario"]
            print(direccionDestinatario)
            direccionRegion = request.POST.get("region", "")
            print(direccionRegion)
            direccionComuna = request.POST.get("comuna", "")
            print(direccionComuna)
            direccionDireccion = request.POST["direccion"]
            print(direccionDireccion)
            direccionNumero = request.POST["numero"]
            print(direccionNumero)
            
            hasDireccion = direccionDestinatario != "" and direccionRegion != "" and direccionComuna != "" and direccionDireccion != "" and direccionNumero != ""
            print(f"HAS COMUNA: {hasDireccion}")
            
            if hasDireccion:
                objDireccion = Direccion.objects.create(
                    usuario=objUser,
                    recibe=direccionDestinatario,
                    region=direccionRegion,
                    comuna=direccionComuna,
                    direccion=direccionDireccion,
                    numero=direccionNumero,
                    depto=request.POST["depto"],
                    predeterminada=True
                )
                objDireccion.save()
        return render(request, 'pages/registro.html', {"failed": objUserExists})
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