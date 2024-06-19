from django.db import models

class Usuario(models.Model):
    rut = models.CharField(primary_key=True, max_length=10, unique=True)
    nombre = models.CharField(max_length=20)
    apellido = models.CharField(max_length=20)
    telefono = models.IntegerField()
    email = models.EmailField(max_length=100, blank=True, null=True)
    password = models.CharField(max_length=30)

    def __str__(self):
        return (f'Usuario: {self.rut} - {self.nombre} {self.apellido}')

class Direccion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="direcciones")
    recibe = models.CharField(max_length=30)
    region = models.CharField(max_length=30)
    comuna = models.CharField(max_length=30)
    direccion = models.CharField(max_length=50)
    numero = models.IntegerField()
    depto = models.CharField(max_length=50, blank=True, null=True)
    predeterminada = models.BooleanField()

    def __str__(self):
        return (f'Dirección: {self.direccion} {self.numero}, {self.comuna}, {self.region}')