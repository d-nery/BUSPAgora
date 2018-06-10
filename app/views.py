from django.shortcuts import render
from .models import Ponto

import json

# Create your views here.
def index(request):
    pontos = Ponto.objects.all()

    imprimir = ''
    points_name = []
    points_dict = []
    points_last_lotacao = []
    points_last_circular_lotacao = []
    points_last_circular_time = []
    lotacao = []

    for ponto in pontos:
        points_last_lotacao.append(ponto.lotacoes.all()[0].lotacao)
        points_name.append(ponto.name)
        points_dict.append({
            "lat": ponto.lat,
            "lng": ponto.lon
        })
        points_last_circular_lotacao.append(ponto.ultimo_circular.lotacoes.all()[0].lotacao)
        points_last_circular_time.append(ponto.ultimo_circular.lotacoes.all()[0].collected.isoformat())

    for lot in pontos[0].lotacoes.all():
        lotacao.append([lot.collected.isoformat(), lot.lotacao])

    return render(request, 'index.html', {
        'points_name': json.dumps(points_name),
        'points_last_lotacao': json.dumps(points_last_lotacao),
        'points_dict': json.dumps(points_dict),
        'lotacao': json.dumps(lotacao),
        'points_last_circular_lotacao': json.dumps(points_last_circular_lotacao),
        'points_last_circular_time': json.dumps(points_last_circular_time),
        'points': Ponto.objects.all()
    })
