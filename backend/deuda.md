# 💸 Deuda Técnica: Backend

Registro de compromisos técnicos del motor de telemetría y API.

---

## 🟢 Deuda de Sprint 1: "Technical Foundation"
*Validado el 17/04/2026*

1.  **Validación de Esquemas**: Se implementó lógica básica de Mongoose, pero falta validación rigurosa de payloads MQTT para evitar datos corruptos.
2.  **Rate Limiting**: El servidor Socket.IO no tiene límites de emisión. Deuda: Implementar throttling para evitar saturación del cliente en ráfagas de datos.
3.  **Logs**: Se usa `console.log`. Deuda: Integrar una librería de logging profesional (Winston o Pino) para trazabilidad en producción.
4.  **Error Handling**: Errores en el cliente MQTT pueden tirar el proceso. Deuda: Implementar reconexión resiliente y manejo de excepciones global.
