from django.contrib import admin
from .models import Usuario, Direccion, CategoriaProducto, Producto

# Register your models here.

admin.site.register(Usuario)
admin.site.register(Direccion)
admin.site.register(CategoriaProducto)
admin.site.register(Producto)
