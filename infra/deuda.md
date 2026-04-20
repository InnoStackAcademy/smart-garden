# 💸 Deuda Técnica: Infraestructura

Registro de compromisos técnicos en el despliegue y orquestación.

---

## 🟢 Deuda de Sprint 1: "Technical Foundation"
*Validado el 17/04/2026*

1.  **Versión de MongoDB**: Se fijó la v4.4.18 por compatibilidad con Raspberry Pi. Deuda: Evaluar actualización a versiones más modernas o cambio de imagen base si se migra a hardware ARMv9.
2.  **Backup de Datos**: Actualmente MongoDB persiste en un volumen Docker local. Deuda: Implementar script de rotación de backups y exportación a almacenamiento externo.
3.  **Monitoreo de Contenedores**: No hay métricas de consumo de RAM/CPU en la Pi. Deuda: Configurar Prometheus/Grafana o un agente ligero de monitoreo.
4.  **Seguridad de Red**: El broker MQTT está abierto internamente en la red Docker. Deuda: Reforzar ACLs y autenticación por certificado en producción.
