# 🛠️ Infraestructura y Despliegue - BioSync

Este módulo gestiona la orquestación de servicios y la operativa de despliegue para arquitecturas mixtas (**ARM64** para desarrollo en campo y **AMD64** para producción en la nube).

## 🏗️ Estrategia de Despliegue
Para proteger los recursos de la Raspberry Pi, no realizamos builds localmente:
1. **Build**: GitHub Actions genera imágenes multi-arch y las sube a GHCR.
2. **Deploy**: La Pi descarga (`pull`) las imágenes ya compiladas.

## 📁 Estructura
- `/compose`: 
  - `docker-compose.dev.yml`: Entorno de desarrollo local (AMD64).
  - `docker-compose.pi.yml`: Orquestación optimizada para Raspberry Pi.
- `/deploy`: Scripts de automatización.
- `/docker`: Archivos de configuración (ej. `mosquitto.conf`).

## ⚙️ Operativa de Despliegue en ARM (Raspberry Pi)

Para actualizar el stack en la Raspberry Pi con las últimas imágenes de GitHub:

### 🚀 Método Recomendado (Remoto)
Ejecute el script de despliegue que reside en el servidor. Esto evita problemas de compatibilidad de finales de línea (CRLF vs LF) al operar desde Windows:
```bash
ssh admin@ubuntu-pi "bash /home/admin/stacks/smart-garden/deploy-pi.sh"
```

### ⚠️ Advertencia sobre Windows/PowerShell
**No se recomienda** pipear el archivo local hacia el servidor remoto (ej: `Get-Content ... | ssh`), ya que PowerShell envía finales de línea CRLF que causan errores de ejecución en el entorno Linux del servidor ARM.


## ⚠️ Notas Críticas de Compatibilidad
### MongoDB en Raspberry Pi 4
MongoDB >= 5.0 requiere instrucciones `LSE` (ARMv8.2-A) no presentes en la RPi 4.
- **Imagen Obligatoria**: `mongo:4.4.18`
- **Nota**: No intentar actualizar esta imagen sin verificar compatibilidad de CPU.

### Nginx y SPA Navigation
Para evitar que se pierda el puerto (8080) en las redirecciones internas de la SPA:
- Se han desactivado `absolute_redirect` y `port_in_redirect` en la configuración de Nginx.
- Se recomienda el uso de **trailing slashes** en las rutas del frontend.

---
© 2026 InnoStack Academy - BioSync Smart Garden
