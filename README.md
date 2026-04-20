# 🌿 Smart Garden IoT

Plataforma de monitoreo y control inteligente de jardines. Conecta sensores y actuadores físicos (ESP32) con un backend en la nube y un dashboard web en tiempo real.

## Arquitectura

```
ESP32 (Edge)  ──MQTT──►  Backend (Node.js)  ──Socket.IO──►  Frontend (Astro + React)
  sensores                  │ Express API                      Dashboard
  actuadores                │ MongoDB                          Controles
                            └─────── Shared Logic (Contrato) ──────┘
```

## Metodología de Seguimiento

El proyecto utiliza un enfoque Scrum pragmático documentado directamente en el repositorio:

*   **`BITACORA.md`**: Registro histórico de hitos, decisiones técnicas y planificación de Épicas/Sprints. Es el "diario de navegación" del proyecto.
*   **`deuda.md`**: Registro de la **Deuda Técnica** aceptada. Solo se añaden ítems tras validar y completar un Sprint, documentando aquello que se postergó por razones de tiempo o prioridad para ser saldado en el futuro.

Cada módulo (`backend/`, `front/`, `infra/`) mantiene su propia bitácora y registro de deuda para un seguimiento granular.

---

## Estructura del repositorio

```
├── backend/       → API REST + MQTT client + Socket.IO (Node.js)
├── front/         → Dashboard web (Astro 5 + React) + Design System
├── shared/        → Tipos, constantes y lógica compartida (Contrato)
├── infra/         → Docker Compose, deploy scripts, configs
└── .github/       → CI/CD (GitHub Actions → GHCR multi-arch)
```

## Stack

| Capa | Tecnología |
|------|-----------|
| Edge | ESP32 + PlatformIO + Arduino |
| Transporte | MQTT (Mosquitto) |
| Backend | Node.js + Express + Mongoose |
| Base de datos | MongoDB |
| Tiempo real | Socket.IO |
| Frontend | Astro 5 + React + Tailwind CSS |
| Infra | Docker + GitHub Actions + GHCR |
| Deploy | ARM-dev (Raspberry Pi) / AMD-dev (VPS) |

## Desarrollo local

```bash
# 1. Levantar infra (Mosquitto + MongoDB)
docker compose -f infra/compose/docker-compose.dev.yml up -d

# 2. Instalar dependencias del backend
cd backend && npm install

# 3. Copiar variables de entorno
cp .env.example .env

# 4. Arrancar backend en modo dev
npm run dev

# 5. (Opcional) Simular ESP32
npm run simulate
```

## Deploy a ARM-dev (Raspberry Pi)

```bash
# Setup inicial (una sola vez)
ssh admin@ubuntu-pi 'bash -s' < infra/deploy/setup-pi.sh

# Deploy (pull imagen pre-buildeada + up)
ssh admin@ubuntu-pi 'bash -s' < infra/deploy/deploy-pi.sh
```

## Evolución del proyecto

| Ejercicio | Alcance |
|-----------|---------|
| **1 — Base Técnica** | Un device, un usuario. Monitoreo + control remoto |
| **2 — Multiusuario** | Auth, multi-tenant, aislamiento de datos |
| **4 — Ecosistema Autónomo** | Decisiones autónomas, fail-safe offline, integración clima |

## Licencia

MIT © InnoStack
