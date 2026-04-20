# 🏗️ Backend — Smart Garden IoT

Núcleo de gestión y datos basado en Node.js. Se encarga de la persistencia de telemetría, orquestación de comandos y comunicación en tiempo real.

## Tecnologías
- **Node.js + Express:** API REST.
- **Mongoose:** Modelado y persistencia en MongoDB.
- **MQTT.js:** Cliente para comunicación con el broker.
- **Socket.IO:** Comunicación bidireccional con el frontend.

## Estructura
- `/src/models`: Esquemas de datos (`SensorReading`, `DeviceCommand`).
- `/src/services`: Lógica de comunicación (`mqttService`, `socketService`).
- `/src/routes`: Endpoints de la API.
- `/simulator`: Script para emular un ESP32.

## Desarrollo Local
1. Configurar `.env` (basado en `.env.example`).
2. Instalar dependencias: `npm install`.
3. Levantar infra local: `docker compose -f ../infra/compose/docker-compose.dev.yml up -d`.
4. Correr: `npm run dev`.

## Simulador
Para probar el flujo sin hardware real:
```bash
npm run simulate
```
