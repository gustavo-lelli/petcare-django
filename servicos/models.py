from email.policy import default
from secrets import token_hex, token_urlsafe
from django.db import models
from clientes.models import Cliente
from datetime import datetime

class Servico(models.Model):
    titulo = models.CharField(max_length=30)
    cliente = models.ForeignKey(Cliente, on_delete=models.SET_NULL, null=True)
    categoria = models.CharField(max_length=12, null=True, blank=True)
    data_inicio = models.DateField(null=True)
    data_entrega = models.DateField(null=True)
    finalizado = models.BooleanField(default=False)
    protocolo = models.CharField(max_length=52, null=True, blank=True)
    identificador = models.CharField(max_length=24, null=True, blank=True)

    def __str__(self) -> str:
        return self.titulo

    def save(self, *args, **kwargs):
        if not self.protocolo:
            self.protocolo = datetime.now().strftime("%d/%m/%Y-%H:%M:%S-") + token_hex(16)

        if not self.identificador:
            self.identificador = token_urlsafe(16)

        super(Servico, self).save(*args, **kwargs)