from django.shortcuts import render
from .models import CategoriaProducto, Producto

# Create your views here.

def index(request):
    categorias = CategoriaProducto.objects.all()
    
    for categoria in categorias:
        categoria.nombre_capitalize = categoria.nombre.capitalize()
    
    productos = Producto.objects.all()
    
    for producto in productos:
        producto.precio_con_descuento = producto.precio - (producto.precio * producto.descuento / 100)
    
    context = {
        'categorias': categorias,
        'productos': productos
    }
    
    return render(request, 'pages/index.html', context)

def despacho(request):
    categorias = CategoriaProducto.objects.all()
    
    for categoria in categorias:
        categoria.nombre_capitalize = categoria.nombre.capitalize()
        
    context = {
        'categorias': categorias
    }
    return render(request, 'pages/despacho.html', context)

def register(request):
    return render(request, 'pages/register.html')

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
    return render(request, 'pages/terms.html')

def privacy(request):
    return render(request, 'pages/privacy.html')

def gestion(request):
    return render(request, 'dashboard/gestion.html')

def profile(request):
    return render(request, 'account/profile.html')

def shop_cart(request):
    return render(request, 'account/shop-cart.html')

def orders(request):
    return render(request, 'account/orders.html')

def pays(request):
    return render(request, 'account/pays.html')