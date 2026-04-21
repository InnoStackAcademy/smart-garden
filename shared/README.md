# 🤝 Shared — Smart Garden IoT

Lógica, tipos y constantes compartidas entre el **Backend** y el **Frontend**. Este módulo actúa como el "contrato de comunicación" del sistema.

## 📁 Estructura
- **`constants.js`**: Nombres de eventos de Socket.IO, tópicos MQTT y configuraciones globales.
- **`types.ts`**: Definiciones de interfaces TypeScript para sensores, actuadores y mensajes.
- **`BITACORA.md`**: Seguimiento de cambios en el contrato de comunicación.
- **`deuda.md`**: Registro de mejoras pendientes en la compartición de lógica.

## 🚀 Uso
Los archivos en esta carpeta deben ser importados mediante rutas relativas desde los módulos principales.
- En Backend: `require('../../shared/constants')`
- En Frontend: `import { SENSOR_UPDATE } from '../../../shared/constants'`

## 📋 Especificación del Contrato (SensorsData)
El sistema está diseñado para procesar una trama de 7 métricas clave:
1. **Temperatura** (°C)
2. **Humedad Aire** (%)
3. **Humedad Suelo** (%)
4. **Luminosidad** (Lux)
5. **Conductividad** (mS/cm)
6. **Caudal** (L/min)
7. **Volumen Total** (L)
