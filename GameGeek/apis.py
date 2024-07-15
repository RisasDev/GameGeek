from .models import Usuario, Direccion, CategoriaProducto, Producto
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
import json
import os

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
    
def guardarMisDatos(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        
        email = json_data["email"].strip()
        emailExists = email != request.user.email and Usuario.objects.filter(email=email).exists()
        
        if emailExists:
            return HttpResponse(json.dumps({"emailExist": True}), content_type="application/json")
        
        actualPassword = json_data["actual_password"].strip()
        
        if actualPassword != "" and not request.user.check_password(actualPassword):
            return HttpResponse(json.dumps({"passwordIncorrect": True}), content_type="application/json")
        
        Usuario.objects.update_user(
            request.user.rut,
            json_data["nombre"],
            json_data["apellido"],
            json_data["telefono"].strip(),
            email,
            json_data.get("new_password", None)
        )
        
        return HttpResponse(json.dumps({"success": True}), content_type="application/json")
    
def dashboardAgregarCategoria(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        
        try:
            nombre = json_data["nombre"]
            nombre_imagen = nombre.replace(" ", "_") + "." + json_data["imagen"].split(".")[-1]
            
            ruta = "GameGeek/static/img/categorias/" + nombre_imagen
            
            with open(ruta, "wb") as file:
                file.write(bytes(json_data["imagen_data"]))
            
            CategoriaProducto.objects.create_categoria_producto(nombre, nombre_imagen)
            return HttpResponse(json.dumps({"success": True}), content_type="application/json")
        except:
            return HttpResponse(json.dumps({"success": False}), content_type="application/json")
    
def dashboardObtenerProducto(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        id_producto = json_data.get("id_producto", "")
        
        if id_producto == "":
            return HttpResponse(json.dumps({}), content_type="application/json")
        
        producto = Producto.objects.get(id=id_producto)
        
        if producto is None:
            return HttpResponse(json.dumps({}), content_type="application/json")
        
        return HttpResponse(json.dumps({
            "id": producto.id,
            "nombre": producto.nombre,
            "precio": producto.precio,
            "descuento": producto.descuento,
            "stock": producto.stock,
            "descripcion": producto.descripcion,
            "imagen": producto.imagen
        }), content_type="application/json")
    
def dashboardAgregarProducto(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        
        try:
            nombre_imagen = json_data["nombre"].replace(" ", "_") + "." + json_data["imagen"].split(".")[-1]
            
            Producto.objects.create_producto(
                nombre=json_data["nombre"],
                imagen=nombre_imagen,
                precio=json_data["precio"],
                descuento=json_data["descuento"],
                stock=json_data["stock"],
                descripcion=json_data["descripcion"],
                id_categoria_producto=json_data["categoria"]
            )
            
            ruta = "GameGeek/static/img/productos/" + nombre_imagen
            
            with open(ruta, "wb") as file:
                file.write(bytes(json_data["imagen_data"]))
            
            return HttpResponse(json.dumps({"success": True}), content_type="application/json")
        except Exception as e:
            print(e)
            return HttpResponse(json.dumps({"success": False}), content_type="application/json")
    
def dashboardEliminarProducto(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        
        try:
            producto = Producto.objects.get(id=json_data["id_producto"])
            old_ruta = "GameGeek/static/img/productos/" + producto.imagen
            
            if os.path.exists(old_ruta):
                os.remove(old_ruta)
            
            Producto.objects.delete_producto(producto.id)
            return HttpResponse(json.dumps({"success": True}), content_type="application/json")
        except:
            return HttpResponse(json.dumps({"success": False}), content_type="application/json")
        
def dashboardModificarProducto(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        
        try:
            old_ruta = "GameGeek/static/img/productos/" + json_data["old_imagen"]
            
            # Eliminar imagen antigua
            if os.path.exists(old_ruta):
                os.remove(old_ruta)
                
            nombre_imagen = json_data["nombre"].replace(" ", "_") + "." + json_data["imagen"].split(".")[-1]
            
            Producto.objects.update_producto(
                json_data["id"],
                json_data["nombre"],
                nombre_imagen,
                json_data["precio"],
                json_data["descuento"],
                json_data["stock"],
                json_data["descripcion"],
                json_data["categoria"]
            )
            
            ruta = "GameGeek/static/img/productos/" + nombre_imagen
            
            with open(ruta, "wb") as file:
                file.write(bytes(json_data["imagen_data"]))
            
            return HttpResponse(json.dumps({"success": True}), content_type="application/json")
        except:
            return HttpResponse(json.dumps({"success": False}), content_type="application/json")