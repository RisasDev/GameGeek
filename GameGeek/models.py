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