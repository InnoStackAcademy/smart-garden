# 🏗️ Bitácora: Backend

## 📝 Estado Actual: 🟢 FUNCIONAL (CORE VALIDADO)
El backend cuenta con la orquestación necesaria para el monitoreo y control en tiempo real. Validado para integración con el frontend Astro.

## 📅 Avances
| Fecha | Acción | Resultado |
|-------|--------|-----------|
| 10/04/2026 | Scaffold Inicial | Express + Mongoose configurado. |
| 13/04/2026 | MQTT Service | Conexión con Mosquitto y suscripción a tópicos de sensores. |
| 15/04/2026 | Socket.IO | Emisión de eventos en tiempo real hacia el frontend (`sensor:update`). |
| 16/04/2026 | Simulador ESP32 | Script listo para emular tráfico de sensores sin hardware físico. |
| 20/04/2026 | Auditoría Técnica | Verificación de servicios y modelos. El sistema está listo para el Sprint de Integración. |
| 20/04/2026 | Integración Shared | Migración del contrato a ESM y actualización del runtime a Node 22. |
| 20/04/2026 | Socket.IO Full | Manejo de comandos bidireccionales (`command:send`) integrado. |

## 🚀 Próximos Pasos (Sprint de Integración)
- [x] **[ISSUE-003]** Proveer credenciales y endpoints para el frontend Astro (Socket.IO).
- [ ] Implementar autenticación JWT para proteger los comandos de actuadores.
- [ ] Desarrollar endpoints de agregación (promedios por hora/día) para la pantalla de Históricos.
- [ ] Middleware de validación con Zod para el broker MQTT.
