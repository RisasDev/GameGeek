from django.shortcuts import render
from .models import Usuario, Direccion

# Create your views here.

def index(request):
    return render(request, 'pages/index.html')

def despacho(request):
    return render(request, 'pages/despacho.html')

def createAccount(request):
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
            
            direccionDestinatario = request.POST.get("destinatario", "")
            direccionRegion = request.POST.get("region", "")
            direccionComuna = request.POST.get("comuna", "")
            direccionDireccion = request.POST.get("direccion", "")
            direccionNumero = request.POST.get("numero", "")
            
            hasDireccion = direccionDestinatario != "" and direccionRegion != "" and direccionComuna != "" and direccionDireccion != "" and direccionNumero != ""
  
            if hasDireccion:
                objDireccion = Direccion.objects.create(
                    usuario=objUser,
                    recibe=direccionDestinatario,
                    region=direccionRegion,
                    comuna=direccionComuna,
                    direccion=direccionDireccion,
                    numero=direccionNumero,
                    depto=request.POST.get("depto", ""),
                    predeterminada=True
                )
                objDireccion.save()
        return render(request, 'pages/create-account.html', {"failed": objUserExists})
    else:
        return render(request, 'pages/create-account.html')

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