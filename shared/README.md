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
