# Hoja de ruta: de "documentado" a "AI-ready"

Este documento no es una promesa de que el warehouse ya es consultable por un agente de IA — es el plan concreto para llegar ahí, basado en lo que encontré al construir este manual (ver `hallazgos-y-pendientes.md`). La idea es que un agente (vía MCP, RAG, o un notebook con function calling) pueda responder "¿de dónde sale esta columna del tablero X?" sin alucinar, con la misma confianza con la que este manual lo responde hoy para una persona.

## Diagnóstico actual (línea base, 14 ago 2026)

| Requisito para ser "AI-ready" | Estado actual |
|---|---|
| Metadata legible por máquina (no solo humanos) | 🟡 Parcial — existe `compiled_graph.json`, pero solo cubre las 27 tablas de Dataform, no las 29 declaraciones a fondo ni los procesos externos (notebook) |
| Descripciones confiables por tabla | 🔴 No — 3 de 29 declaraciones tienen descripción placeholder copiada (`hallazgos-y-pendientes.md #2`) |
| Nombres de tabla sin ambigüedad | 🔴 No — colisión de nombres en la dimensión de género (`hallazgos-y-pendientes.md #1`) |
| Trazabilidad tablero → tabla → columna | 🟢 Sí, para los 13 tableros "Koggi" (`mapeo-tableros-looker.md`). No para los otros 44 del directorio general |
| Tests/assertions que detecten roturas de esquema | 🔴 Bajo — solo 9 de 26 tablas tienen assertions (confirmado contra el repo real), y **cero** sobre las tablas que escribe el notebook de género |
| Estructura física predecible (capas) | 🔴 No — 22 de 27 tablas sin carpeta de capa (`arquitectura-y-linaje.md #2`) |

## Pasos propuestos, en orden

### 1. Cerrar los hallazgos bloqueantes (prerrequisito)
No tiene sentido automatizar consultas sobre nombres de tabla que ni el equipo tiene claros. Resolver primero `hallazgos-y-pendientes.md #1` (nombres de género) y `#2` (descripciones placeholder) — son horas de trabajo, no un proyecto.

### 2. Estandarizar `actionDescriptor.description` en el 100% de tablas y declaraciones
Hoy la calidad de descripción es desigual (algunas muy buenas, como `fact_lite_reporte`; otras placeholder). Definir un estándar mínimo por tabla: qué representa, grano, y quién la consume — y aplicarlo parejo. Esto es lo primero que lee cualquier RAG sobre metadata.

### 3. Reorganizar físicamente en `bronze/ silver/ gold/`
Mover las 22 tablas sueltas a su carpeta de capa real (según sus `tags`). Con eso, "¿qué tablas son gold?" se responde con un `ls`, no con una consulta al JSON — reduce la superficie que un agente necesita razonar.

### 4. Generar un manifiesto único versionado (`_MANIFEST.json`)
Combinar `compiled_graph.json` + el diccionario de columnas + las notas manuales de este manual (estado, dueño, tablero que la usa) en **un solo artefacto JSON versionado en el repo**, regenerado en CI cada vez que se hace `dataform compile`. Este manifiesto es el que un servidor MCP expondría como tool (`get_table_lineage`, `get_column_definition`, `list_tables_by_layer`), en vez de que el agente tenga que parsear SQLX crudo.

### 5. Cubrir con assertions los procesos fuera de Dataform
El notebook de género escribe dos tablas sin ningún test de esquema. Como mínimo: un assertion de Dataform tipo `declaration` con `nonNull`/`uniqueKey` sobre `identification` en la tabla final, para que una corrida rota del notebook se detecte igual que si fuera una tabla nativa.

### 6. Exponer el manifiesto vía MCP server (alineado con el resto de tu arquitectura)
Una vez el manifiesto es confiable, envolverlo en un servidor MCP de solo lectura (mismo patrón que ya definiste para el proyecto de plantas: protocolo abierto, sin acoplarse a un proveedor de IA específico) con tools como:
- `lineage(tabla)` → de dónde viene y qué la consume
- `dashboard_source(tablero)` → tabla(s) fuente de un tablero Looker
- `schema(tabla)` → columnas y tipos

Esto es lo que le permite a cualquier asistente (Claude, o el que sea) responder preguntas de este warehouse citando la fuente real, sin depender de que alguien copie y pegue este manual en el contexto.

### 7. Definir el ciclo de actualización
Este manual (secciones 1-6) se vuelve obsoleto en cuanto alguien agregue una tabla sin regenerarlo. Proponer que `arquitectura-y-linaje.md`, `diccionario-datos.md` y el `_MANIFEST.json` se regeneren automáticamente en el pipeline de CI/CD cada vez que se mergea un cambio a `definitions/`, en vez de depender de que alguien se acuerde de correr el script a mano.

## Qué NO cubre esta hoja de ruta

No incluye la capa de Alohome (GA4/GTM) — ese es un flujo de datos distinto (eventos de analítica web, no BigQuery/Dataform) y su propio camino a "AI-ready" probablemente pase por la API de GA4 Data API en vez de un manifiesto de linaje SQL. Ver `docs/alohome/`.
