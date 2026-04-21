import paho.mqtt.client as mqtt
from paho.mqtt.enums import CallbackAPIVersion
import json
import time
import random
import sys
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
    
    # Variable persistente para el acumulado de agua (fuera del loop si fuera una clase, pero aquí lo simulamos)
    flow_total_acc = 120.5 

    while True:
        # Generamos valores realistas y normalizados
        flow_instant = round(random.uniform(0.0, 4.5), 2)
        flow_total_acc += (flow_instant / 20) # Simulamos incremento por cada ciclo de 3s
        
        payload = {
            "device_id": DEVICE_ID,
            "timestamp": int(time.time() * 1000),
            "sensors": {
                "temperature": round(random.uniform(22.0, 26.5), 1),
                "humidity_air": round(random.uniform(45.0, 60.0), 1),
                "humidity_soil": round(random.uniform(35.0, 85.0), 1), # Ahora sí en % real
                "light": random.randint(1500, 8000),
                "conductivity": round(random.uniform(1.2, 2.1), 2),
                "flow_rate": flow_instant,
                "flow_total": round(flow_total_acc, 2)
            }
        }
        print(f"PUBLICANDO: Temp={payload['sensors']['temperature']}°C | Hum_Suelo={payload['sensors']['humidity_soil']}% | Caudal={payload['sensors']['flow_rate']}L/min")
        sys.stdout.flush()
        client.publish(TOPIC, json.dumps(payload))
        time.sleep(3)
        
except Exception as e:
    print(f"ERROR CRITICO: {e}")
    sys.stdout.flush()
finally:
    print("DEBUG: Finalizando script")
    sys.stdout.flush()
