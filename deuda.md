# 💸 Deuda Técnica Global: Smart Garden IoT

Este documento registra las deficiencias técnicas aceptadas y postergadas durante la ejecución de los Sprints para cumplir con los hitos de entrega.

---

## 🟢 Derivado de Sprint 1: "Technical Foundation" (Backend & Infra)
*Validado el 17/04/2026*

- **[SEGURIDAD] Gestión de Secretos**: Se utilizan archivos `.env.local`. Deuda: Migrar a un Secret Manager (HashiCorp Vault o similar) para producción.
- **[CALIDAD] Cobertura de Tests**: Se priorizó la funcionalidad core. Deuda: Implementar tests unitarios (Jest/Vitest) e integración para los endpoints de telemetría.
- **[DOCS] Documentación de API**: Los endpoints están operativos pero no documentados formalmente. Deuda: Generar Swagger/OpenAPI.
- **[RELIABILITY] Heartbeat de Hardware**: El sistema asume que el ESP32 está vivo si hay datos. Deuda: Implementar un sistema de LWT (Last Will and Testament) en MQTT para detectar caídas reales.

---

## 🟡 Derivado de Sprint 2: "Botanical UI implementation" (Maquetado)
*Validado el 20/04/2026*

- **[UX] Responsividad**: Las maquetas actuales son 100% Desktop. Deuda: Definir adaptabilidad mobile (crítica para uso en campo).
- **[UI] Estados de Excepción**: Se diseñó solo el "Happy Path" con datos. Deuda: Diseñar pantallas para "Sin dispositivos", "Error de conexión" y "Carga (Skeletons)".
- **[AESTHETIC] Iconografía**: Se usan Material Symbols estándar. Deuda: Reemplazar por un set personalizado más orgánico/botánico.
- **[ARQUITECTURA] State Management**: El maquetado no define cómo persistir el estado entre rutas. Deuda: Definir entre Context, Zustand o Nano Stores.

---

## 🔵 Derivado de Sprint 3: "Componentization & Integration"
*Validado el 21/04/2026*

- **[DATOS] Paridad de Telemetría**: El flujo actual solo transporta 2 de los 7 sensores definidos. Deuda: Actualizar `test_telemetry.py` y cards del frontend.
- **[MÉTRICAS] Simulación de Host**: Indicadores de CPU/RAM usan lógica local. Deuda: Implementar telemetría de host en backend.
- **[LÓGICA] Normalización**: Valores crudos de sensores sin escalar (ej. 401%). Deuda: Capas de mapeo en `shared` o `backend`.
