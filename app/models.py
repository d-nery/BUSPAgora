from django.db import models

class Circular(models.Model):
    prefixo = models.IntegerField()

class LotacaoCircular(models.Model):
    collected = models.DateField()
    lotacao = models.IntegerField()
    circular = models.ForeignKey('Circular', related_name='lotacoes', on_delete=models.CASCADE)

    class Meta:
        ordering = ['-collected']

class Ponto(models.Model):
    name = models.CharField(max_length=128)
    lat = models.FloatField()
    lon = models.FloatField()
    ultimo_circular = models.ForeignKey('circular', related_name="ultimo_ponto", blank=True, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name

class LotacaoPonto(models.Model):
    collected = models.DateTimeField()
    lotacao = models.IntegerField()
    circular = models.ForeignKey('Ponto', related_name='lotacoes', on_delete=models.CASCADE)

    class Meta:
        ordering = ['-collected']
