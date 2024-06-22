from .models import Usuario, Direccion
from django.http import HttpResponse
import json

def login(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        
        rut = json_data["rut"]
        password = json_data["password"]
        objUser = Usuario.objects.filter(rut=rut, password=password).first()
        return HttpResponse(json.dumps({"success": objUser is not None}), content_type="application/json")