import django
import numpy as np
import random
from datetime import datetime
from datetime import timedelta
from app.models import Ponto, LotacaoPonto
delta = timedelta(minutes=5)
today = datetime.now()
for i, ponto in enumerate(Ponto.objects.all()):
    for i in range(30):
        time = today + i*delta
        L = LotacaoPonto(collected=time, lotacao=random.randint(0,21), circular=ponto)
        L.save()
