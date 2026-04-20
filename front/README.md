# 💻 Front-End — Smart Garden IoT

Núcleo de la interfaz de usuario basado en **Astro 5 + React 19**. Integra el sistema de diseño "Botanical Precision" con datos en tiempo real.

## 📁 Estructura
- **`src/`**: Código fuente del proyecto Astro.
- **`design/`**: Activos de diseño, prototipos de Stitch y especificación `DESIGN.md`.
- **`BITACORA.md`**: Seguimiento de avances y próximos pasos del frontend.
- **`deuda.md`**: Registro de deuda técnica y mejoras pendientes.

## 🛠️ Stack
- **Framework:** Astro 5
- **UI:** React 19 + Tailwind CSS 4
- **Real-time:** Socket.IO Client

## 🚀 Comandos de Desarrollo
```bash
cd front
npm install
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Build de producción
```

## 🎨 Flujo de Diseño
1. Las maquetas se exportan desde Stitch a `design/screens`.
2. Se extraen tokens de `design/DESIGN.md`.
3. Se implementan como componentes React en `src/components`.
