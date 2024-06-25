from .models import Usuario, Direccion
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
import json

def iniciar_sesion(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        
        rut = json_data["rut"].strip()
        password = json_data["password"].strip()
        
        user = authenticate(rut=rut, password=password)
        userExists = user is not None
        
        if userExists:
            login(request, user)
            
        return HttpResponse(json.dumps({"success": userExists}), content_type="application/json")
    
def cerrar_sesion(request):
    logout(request)
    return redirect("index")
    
def registrarse(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        
        rut = json_data["rut"].strip()
        userExists = Usuario.objects.filter(rut=rut).exists()
        
        if userExists:
            return HttpResponse(json.dumps({"userExist": userExists}), content_type="application/json")
        
        email = json_data["email"].strip()
        emailExists = Usuario.objects.filter(email=email).exists()
        
        if emailExists:
            return HttpResponse(json.dumps({"emailExist": emailExists}), content_type="application/json")
        
        usuario = Usuario.objects.create_user(
            rut=rut,
            nombre=json_data["nombre"],
            apellido=json_data["apellido"],
            telefono=json_data["telefono"].strip(),
            email=email,
            password=json_data["password"].strip()
        )
        
        destinatario = json_data.get("destinatario", "")
        region = json_data.get("region", "")
        comuna = json_data.get("comuna", "")
        calle = json_data.get("calle", "")
        numero = json_data.get("numero", "")
        
        hasDireccion = destinatario != "" and region != "" and comuna != "" and calle != "" and numero != ""

        if hasDireccion:
            Direccion.objects.create_direccion(
                usuario=usuario,
                recibe=destinatario,
                region=region,
                comuna=comuna,
                direccion=calle,
                numero=numero,
                depto=json_data.get("depto", "")
            )
            
        return HttpResponse(json.dumps({"success": True}), content_type="application/json")