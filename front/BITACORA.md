# 💻 Bitácora: Front-End (Dashboard & Design)

## 📝 Estado Actual: 🟢 UI COMPLETADA / 🟡 INTEGRACIÓN
Interfaz de usuario migrada al 100% a Astro 5. Lista para conexión de datos reales.

## 📅 Avances
| Fecha | Categoría | Acción | Resultado |
|-------|-----------|--------|-----------|
| 20/04/2026 | App | Scaffold | Astro 5 + React + Tailwind 4 inicializado. |
| 20/04/2026 | App | UI Atoms | `SensorCard`, `ActuatorToggle`, `NotificationItem` creados. |
| 20/04/2026 | App | Layout | `MainLayout.astro` y `AuthLayout.astro` implementados. |
| 20/04/2026 | App | Full UI | Todas las páginas (`index`, `control`, `historico`, `alertas`, `configuracion`, `login`) migradas y funcionales. |
| 20/04/2026 | Infra | Portabilidad | Fix `absolute_redirect off` en Nginx para preservar el puerto 8080 en Docker. |
| 20/04/2026 | Build | Runtime | Actualización a Node 22 para compatibilidad con Astro 5. |

## 🚀 Próximos Pasos (URGENTE)
- [x] **[ISSUE-001]** Ejecutar `npx create-astro@latest`.
- [x] **[ISSUE-002]** Crear componentes base de UI (Cards, Toggles).
- [x] **[ISSUE-005]** Migrar todas las pantallas a componentes Astro/React.
- [x] **[ISSUE-003]** Conectar Dashboard con backend (Socket.IO).
- [ ] Implementar gráficas reales (Chart.js) en la página de Históricos.
