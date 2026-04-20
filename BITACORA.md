# 📔 Bitácora General del Proyecto: Smart Garden IoT

## 🚀 Resumen del Proyecto
Sistema de monitoreo y control inteligente para jardines botánicos, integrando hardware (ESP32), backend (Node.js) y frontend (Astro).

---

## 🏗️ Estructura Scrum (Épicas e Historias)

### [ÉPICA 1] Cimientos Técnicos (Base Técnica) — ESTADO: 🟢 COMPLETADO
*   **H1: Infraestructura de Despliegue**: Dockerización de servicios y scripts para Raspberry Pi. (DONE)
*   **H2: Backend Core**: API base, persistencia en MongoDB y comunicación MQTT/Socket.IO. (DONE)
*   **H3: Pipeline CI/CD**: Automatización de builds multi-arquitectura. (DONE)

### [ÉPICA 2] Digital Greenhouse UI (Dashboard) — ESTADO: 🟢 MAQUETADO LISTO
*   **H4: Scaffold de la App**: Inicialización de Astro 5 + React. (DONE)
*   **H5: Implementación de Screens**: Dashboard, Controles e Históricos basados en Stitch. (DONE)
*   **H6: Integración en Tiempo Real**: Conexión de Socket.IO en el frontend. (TODO)

### [ÉPICA 3] Ecosistema Autónomo — ESTADO: ⚪ PENDIENTE
*   **H7: Lógica de Autogestión**: Reglas de riego automático basadas en humedad. (TODO)
*   **H8: Integración Clima**: Consumo de APIs de clima externo. (TODO)

---

## 📅 Log de Sprints

### Sprint 1: "Technical Foundation" (10/04/2026 - 17/04/2026)
*   **Meta:** Tener el backend y la infra lista para recibir datos de un ESP32.
*   **Logros:** [Configuración de Docker, MongoDB v4.4.18, CI/CD Actions]

### Sprint 2: "Botanical UI implementation" (18/04/2026 - 20/04/2026)
*   **Meta:** Implementar el diseño "Botanical Precision" en la aplicación Astro.
*   **Logros:** [Diseño Stitch, Prototipo interactivo de 6 pantallas, Scaffold Astro 5]

### Sprint 3: "Componentization & Integration" (20/04/2026 - Presente)
*   **Meta:** Convertir maquetas en componentes React/Astro reutilizables y conectar datos.
*   **Progreso:**
    *   [20/04] Creación de componentes atómicos: `SensorCard`, `ActuatorToggle`, `NotificationItem`, `StatusBadge`.
    *   [20/04] Ensamblaje de Dashboard dinámico en `index.astro`.
    *   [20/04] **Integración Socket.IO**: Conexión bidireccional entre Front y Back exitosa. (DONE)
    *   [20/04] **Infraestructura Global**: Implementación de CI/CD multi-arquitectura con soporte para el módulo `shared`. (DONE)
    *   [20/04] **Gobernanza**: Actualización de todas las áreas para asegurar rutas relativas y compatibilidad de módulos (ESM). (DONE)

---

## 📋 Backlog de Issues Prioritarios
1.  [ISSUE-001] Inicializar proyecto Astro en carpeta `/front`. (DONE)
2.  [ISSUE-002] Crear componentes base de UI (Cards, Toggles) según `DESIGN.md`. (DONE)
3.  [ISSUE-003] Conectar Dashboard con API de backend para datos reales (Socket.IO). (DONE)
4.  [ISSUE-004] Implementar layouts dinámicos y navegación SPA con View Transitions. (NEXT)
5.  [ISSUE-008] Refactorizar CI/CD para soportar imágenes de Frontend y carpeta Shared. (DONE)
6.  [ISSUE-009] Asegurar consistencia de rutas relativas y portabilidad de red (Nginx fix). (DONE)
