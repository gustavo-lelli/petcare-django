from django.db import models

class Cliente(models.Model):
    nome = models.CharField(max_length=50)
    sobrenome = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    cpf = models.CharField(max_length=15)

    def __str__(self) -> str:
        return self.nome

class Pet(models.Model):
    pet = models.CharField(max_length=50)
    especie = models.CharField(max_length=8)
    raca = models.CharField(max_length=50, null=True)
    idade = models.IntegerField()
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    vacinas = models.IntegerField(default=0)
    tosas = models.IntegerField(default=0)
    banhos = models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.pet
