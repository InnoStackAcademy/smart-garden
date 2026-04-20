# 🛠️ Bitácora: Infraestructura

## 📝 Estado Actual: 🟢 ESTABLE
Control de entorno Docker y despliegue en Raspberry Pi.

## 📅 Avances
| Fecha | Acción | Resultado |
|-------|--------|-----------|
| 12/04/2026 | Creación de Docker Compose Dev | Mosquitto y Mongo listos localmente. |
| 14/04/2026 | Script `setup-pi.sh` | Configuración inicial de Ubuntu Server en RPi. |
| 15/04/2026 | **Fix Mongo ARMv8** | Implementación de `mongo:4.4.18` para evitar error LSE en RPi 4. |
| 17/04/2026 | GitHub Actions Workflow | Build multi-arch configurado y testeado. |

## 🚀 Próximos Pasos
- [ ] Implementar Watchtower para auto-update de contenedores en la Pi.
- [ ] Configurar backup automático de los volúmenes de MongoDB.
