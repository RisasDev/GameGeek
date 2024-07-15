from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Usuario, CategoriaProducto, Producto

# Create your views here.

def getCategorias():
    categorias = CategoriaProducto.objects.all()
    
    for categoria in categorias:
        categoria.nombre_capitalize = categoria.nombre.capitalize()
    
    return categorias

def getProductos():
    productos = Producto.objects.all()
    
    for producto in productos:
        producto.precio_con_descuento = producto.precio - (producto.precio * producto.descuento / 100)
    
    return productos

def index(request):
    context = {
        'categorias': getCategorias(),
        'productos': getProductos()
    }
    
    return render(request, 'pages/index.html', context)

def despacho(request):
    context = {
        'categorias': getCategorias()
    }
    return render(request, 'pages/despacho.html', context)

def register(request):
    context = {
        'categorias': getCategorias()
    }
    return render(request, 'pages/register.html', context)

def post_register(request):
    return render(request, 'pages/post-register.html')

def productos(request, categoria):
    if categoria != "":
        objCategoria = CategoriaProducto.objects.get(nombre=categoria)
        categorias = CategoriaProducto.objects.all()
        
        for cate in categorias:
            cate.nombre_capitalize = cate.nombre.capitalize()
            
        productos = Producto.objects.get_productos_by_categoria(objCategoria)
        
        for producto in productos:
            producto.precio_con_descuento = producto.precio - (producto.precio * producto.descuento / 100)
    
        context = {
            'categoria_principal': objCategoria,
            'categoria_nombre_capitalize': objCategoria.nombre.capitalize(),
            'categorias': categorias,
            'productos': productos,
        }
        
        return render(request, 'pages/productos.html', context)
    else:
        return render(request, 'pages/productos.html')

def password_recovery(request):
    return render(request, 'pages/password-recovery.html')

def terms(request):
    context = {
        'categorias': getCategorias()
    }
    return render(request, 'pages/terms.html', context)

def privacy(request):
    context = {
        'categorias': getCategorias()
    }
    return render(request, 'pages/privacy.html', context)

@login_required
def misDatos(request):
    context = {
        'hidden': 'hidden',
        'rut': request.user.rut,
        'nombre': request.user.nombre,
        'apellido': request.user.apellido,
        'telefono': request.user.telefono,
        'email': request.user.email,
    }
    return render(request, 'account/mis-datos.html', context)

@login_required
def shop_cart(request):
    return render(request, 'account/shop-cart.html')

@login_required
def orders(request):
    return render(request, 'account/orders.html')

@login_required
def pays(request):
    return render(request, 'account/pays.html')

@login_required
def dashboard(request):
    context = {
        'registrados': Usuario.objects.all().count(),
    }
    return render(request, 'dashboard/index.html', context)

@login_required
def dashboardProductos(request):
    productos = Producto.objects.all()
    
    for producto in productos:
        producto.categoria = producto.id_categoria_producto.nombre.capitalize()
    
    context = {
        'productos': productos,
        'categorias': getCategorias()
    }
    return render(request, 'dashboard/productos.html', context)

@login_required
def dashboardCategorias(request):
    context = {
        'categorias': CategoriaProducto.objects.all()
    }
    return render(request, 'dashboard/categorias.html', context)