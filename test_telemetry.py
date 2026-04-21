import paho.mqtt.client as mqtt
from paho.mqtt.enums import CallbackAPIVersion
import json
import time
import random
import sys

# --- CONFIGURACIÓN ---
BROKER = "ubuntu-pi"
PORT = 1883
DEVICE_ID = "esp32_garden_01"
TOPIC = f"jardin/{DEVICE_ID}/sensores"

print(f"DEBUG: Iniciando script con Broker={BROKER}, Port={PORT}")
sys.stdout.flush()

def on_connect(client, userdata, flags, rc, properties=None):
    print(f"DEBUG: Callback on_connect invocado con rc={rc}")
    if rc == 0:
        print(f"CONECTADO exitosamente a {BROKER}")
    else:
        print(f"ERROR de conexion MQTT. Codigo: {rc}")
    sys.stdout.flush()

try:
    # Ajuste para Paho-MQTT 2.0
    client = mqtt.Client(CallbackAPIVersion.VERSION2, client_id=f"python_tester_{random.randint(0, 1000)}")
    client.on_connect = on_connect
    
    print(f"DEBUG: Intentando conectar a {BROKER}:{PORT}...")
    sys.stdout.flush()
    client.connect(BROKER, PORT, 10)
    
    client.loop_start()
    
    while True:
        payload = {
            "device_id": DEVICE_ID,
            "timestamp": int(time.time() * 1000),
            "sensors": {
                "temperature": round(random.uniform(22.0, 26.0), 1),
                "humidity_soil": random.randint(400, 500)
            }
        }
        print(f"PUBLICANDO en {TOPIC}: {payload['sensors']}")
        sys.stdout.flush()
        client.publish(TOPIC, json.dumps(payload))
        time.sleep(3)
        
except Exception as e:
    print(f"ERROR CRITICO: {e}")
    sys.stdout.flush()
finally:
    print("DEBUG: Finalizando script")
    sys.stdout.flush()
