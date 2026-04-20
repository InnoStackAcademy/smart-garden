# 💸 Deuda Técnica: Front-End

Registro de compromisos técnicos adquiridos durante el desarrollo del Frontend.

---

## 🎨 Deuda de Diseño (Sprint 2 - Maquetado)
*Asumida tras la validación del Prototipo Estático (20/04/2026)*

1.  **Mobile First**: El diseño actual es puramente Desktop. Se debe saldar la deuda de adaptabilidad para tablets y smartphones.
2.  **Empty States & Error Handling**: Falta el diseño de estados vacíos y manejo visual de errores de red.
3.  **Skeleton Screens**: Se requiere diseñar los placeholders de carga para las gráficas de históricos.
4.  **Consistencia de Iconos**: Algunos iconos son genéricos; requieren auditoría botánica.

---

## ⚙️ Deuda de Arquitectura (Sprint 3 - Componentización)
1.  **Atomic Consistency**: Asegurar que todos los componentes extraídos sigan los tokens de `@theme` de Tailwind 4 rigurosamente.
2.  **Hydration Strategy**: Evaluar el impacto de `client:load` en el rendimiento y considerar `client:visible` para widgets pesados.
3.  **Librería de Componentes**: Falta centralizar todos los átomos en un Storybook o guía de estilo viva.
