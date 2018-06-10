import paho.mqtt.client as mqtt
import logging

logger = logging.getLogger(__name__)

def on_connect(client, userdata, rc):
    client.subscribe("/hackatopusp2018-grupo7/#")

def on_message(client, userdata, msg):
    logger.info(msg)

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("test.mosquitto.org", 1883, 60)
