from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UsuarioManager(BaseUserManager):
    def create_user(self, rut, nombre, apellido, telefono, email, password=None):
        if not rut:
            raise ValueError("El usuario debe tener un RUT.")
        usuario = self.model(rut=rut, nombre=nombre, apellido=apellido, telefono=telefono, email=email)
        usuario.set_password(password)
        usuario.save(using=self._db)
        return usuario

    def create_superuser(self, rut, nombre, apellido, telefono, email, password):
        usuario = self.create_user(rut, nombre, apellido, telefono, email, password)
        usuario.is_staff = True
        usuario.is_superuser = True
        usuario.save(using=self._db)
        return usuario
    
    def delete_user(self, rut):
        usuario = self.get(rut=rut)
        usuario.delete()
        
    def update_user_by_admin(self, rut, nombre, apellido, telefono, email, password):
        usuario = self.get(rut=rut)
        usuario.nombre = nombre
        usuario.apellido = apellido
        usuario.telefono = telefono
        usuario.email = email
        usuario.set_password(password)
        usuario.save()
        return usuario
    
    def update_user_by_user(self, rut, nombre, apellido, telefono, email):
        usuario = self.get(rut=rut)
        usuario.nombre = nombre
        usuario.apellido = apellido
        usuario.telefono = telefono
        usuario.email = email
        usuario.set_password(usuario.password)
        usuario.save()
        return usuario

class Usuario(AbstractBaseUser, PermissionsMixin):
    rut = models.CharField(primary_key=True, max_length=10, unique=True)
    nombre = models.CharField(max_length=20)
    apellido = models.CharField(max_length=20)
    telefono = models.IntegerField()
    email = models.EmailField(max_length=100, unique=True, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    objects = UsuarioManager()
    
    USERNAME_FIELD = 'rut'
    REQUIRED_FIELDS = ['nombre', 'apellido', 'telefono', 'email']

    def __str__(self):
        return (f'Usuario: {self.rut} - {self.nombre} {self.apellido}')
    
class DireccionManager(models.Manager):
    def create_direccion(self, usuario, recibe, region, comuna, direccion, numero, depto):
        direccion = self.model(usuario=usuario, recibe=recibe, region=region, comuna=comuna, direccion=direccion, numero=numero, depto=depto)
        direccion.save(using=self._db)
        return direccion

    def delete_direccion(self, usuario, recibe):
        direccion = self.get(usuario=usuario, recibe=recibe)
        direccion.delete()

    def update_direccion(self, usuario, recibe, region, comuna, direccion, numero, depto):
        direccion = self.get(usuario=usuario, recibe=recibe)
        direccion.region = region
        direccion.comuna = comuna
        direccion.direccion = direccion
        direccion.numero = numero
        direccion.depto = depto
        direccion.save()
        return direccion

class Direccion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="direcciones")
    recibe = models.CharField(max_length=30)
    region = models.CharField(max_length=30)
    comuna = models.CharField(max_length=30)
    direccion = models.CharField(max_length=50)
    numero = models.IntegerField()
    depto = models.CharField(max_length=50, blank=True, null=True)
    
    objects = DireccionManager()

    def __str__(self):
        return (f'Dirección: {self.direccion} {self.numero}, {self.comuna}, {self.region}')
    
class CategoriaProductoManager(models.Manager):
    def create_categoria_producto(self, nombre):
        categoria_producto = self.model(nombre=nombre)
        categoria_producto.save(using=self._db)
        return categoria_producto

    def delete_categoria_producto(self, nombre):
        categoria_producto = self.get(nombre=nombre)
        categoria_producto.delete()

    def update_categoria_producto(self, nombre, nuevo_nombre):
        categoria_producto = self.get(nombre=nombre)
        categoria_producto.nombre = nuevo_nombre
        categoria_producto.save()
        return categoria_producto
    
class CategoriaProducto(models.Model):
    id = models.AutoField(primary_key=True, db_column='ID_CATEGORIA_PRODUCTO')
    nombre = models.CharField(max_length=30, unique=True)
    imagen = models.CharField(max_length=100, blank=True, null=True)
    
    objects = CategoriaProductoManager()

    def __str__(self):
        return (f'Categoría: {self.nombre}')
    
class ProductoManager(models.Manager):
    def create_producto(self, nombre, imagen, precio, descuento, stock, descripcion, categoria):
        producto = self.model(nombre=nombre, imagen=imagen, precio=precio, descuento=descuento, stock=stock, descripcion=descripcion, categoria=categoria)
        producto.save(using=self._db)
        return producto

    def delete_producto(self, nombre):
        producto = self.get(nombre=nombre)
        producto.delete()

    def update_producto(self, nombre, nuevo_nombre, imagen, precio, descuento, stock, descripcion, categoria):
        producto = self.get(nombre=nombre)
        producto.nombre = nuevo_nombre
        producto.imagen = imagen
        producto.precio = precio
        producto.descuento = descuento
        producto.stock = stock
        producto.descripcion = descripcion
        producto.categoria = categoria
        producto.save()
        return producto
    
    def get_productos_by_categoria(self, categoria):
        return self.filter(id_categoria_producto=categoria.id)
    
    def add_stock(self, nombre, cantidad):
        producto = self.get(nombre=nombre)
        producto.stock += cantidad
        producto.save()
        return producto
    
    def remove_stock(self, nombre, cantidad):
        producto = self.get(nombre=nombre)
        producto.stock -= cantidad
        producto.save()
        return producto
    
class Producto(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50, unique=True)
    imagen = models.CharField(max_length=100, blank=True, null=True)
    precio = models.IntegerField()
    descuento = models.IntegerField(default=0)
    stock = models.IntegerField()
    descripcion = models.TextField()
    id_categoria_producto = models.ForeignKey(CategoriaProducto, on_delete=models.CASCADE, db_column='ID_CATEGORIA_PRODUCTO')
    
    objects = ProductoManager()

    def __str__(self):
        return (f'Producto: {self.nombre} - ${self.precio}')