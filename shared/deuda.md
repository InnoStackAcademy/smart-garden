# 💸 Deuda Técnica: Shared

Registro de compromisos técnicos en el módulo de lógica compartida.

---

## 🟡 Deuda de Sprint 3: "Integration"
1.  **Duplicación de Tipos**: Actualmente se usan archivos `.js` para constantes por compatibilidad directa con Node (CommonJS). Deuda: Migrar a un formato que soporte ESM y CJS sin fricción o usar compilación.
2.  **Validación**: Falta implementar esquemas de validación (Zod) compartidos para que el Front valide los datos antes de enviarlos y el Back haga lo mismo al recibirlos.
3.  **i18n**: Si se escala a varios idiomas, las claves de traducción deberían vivir aquí.
