# 🛠️ Infraestructura y Deploy

Configuración del entorno y scripts de despliegue para arquitecturas ARM (Raspberry Pi) y AMD (Cloud).

## Estructura
- `/compose`: Archivos Docker Compose para diferentes entornos.
- `/deploy`: Scripts de automatización de despliegue.
- `/docker`: Configuraciones específicas de contenedores (Mosquitto).

## Notas Críticas de Hardware
### MongoDB en Raspberry Pi (ARMv8-A)
Las versiones de MongoDB ≥ 5.0 (y parches recientes de 4.4/4.2) requieren la extensión **ARMv8.2-A** (instrucciones `LSE`). La Raspberry Pi 4 no soporta estas instrucciones.
- **Solución aplicada:** Se utiliza la imagen **`mongo:4.4.18`** para asegurar compatibilidad con RPi 4.

## Comandos de Deploy
Desde la raíz del proyecto (usando `.env.local` configurado):
```bash
# Setup inicial
ssh admin@ubuntu-pi 'bash -s' < infra/deploy/setup-pi.sh

# Deploy de nueva versión
ssh admin@ubuntu-pi 'bash -s' < infra/deploy/deploy-pi.sh
```
