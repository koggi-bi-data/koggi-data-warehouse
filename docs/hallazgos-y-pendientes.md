# Hallazgos y pendientes — Koggi Data Warehouse

> Este documento existe para que ningún hallazgo se pierda entre el diccionario, el grafo compilado, el notebook y los tableros. Cada ítem tiene un estado: 🔴 bloqueante para documentar con certeza, 🟡 no bloqueante pero debe confirmarse, 🟢 solo informativo.

## 1. 🔴 Inconsistencia de nombres: dimensión de género

Tres nombres distintos aparecen para lo que parece ser el mismo concepto (dimensión de género inferido por nombre/identificación), y **no coinciden entre sí**:

| Fuente | Nombre de tabla | Grano |
|---|---|---|
| `_Proyecto_Koggi - Tablas.xlsx` y `compiled_graph.json` (declaración) | `BI.dim_nombres_genero` | 1 fila por persona (`fullName`, `firstName`... `identification`, `gender_inferred`) |
| `dim_genero_iterativo.ipynb` → `TBL_DICC` | `BI.dim_genero_nombres` | 1 fila por **nombre único** (diccionario acumulado) |
| `dim_genero_iterativo.ipynb` → `TBL_PERSONAS` | `BI.dim_persona_genero` | 1 fila por **identification única** (la que consumen los reportes) |

`BI.dim_nombres_genero` (la que usa `profiling_dashboard_quick_win_v2` según el grafo) tiene columnas de grano "por persona", lo que la acerca más a `dim_persona_genero` que a `dim_genero_nombres` — pero **ningún nombre coincide exactamente con ninguno de los dos**. No voy a asumir cuál es la relación real (¿son la misma tabla con un nombre desactualizado en un lado? ¿son tablas distintas que casualmente se parecen?). **Necesito que confirmes esto antes de que el diccionario de datos declare una relación entre ellas.**

## 0. ✅ Auditoría contra el repo real (14-ago-2026)

Se recibió el zip del estado actual de `koggi-data-warehouse` (commit 6-ago-2026) y se validó contra todo lo documentado:
- Los 27 `.sqlx` del repo coinciden exactamente (mismo nombre, misma ruta) con las 27 tablas de `compiled_graph.json` — **0 faltantes, 0 sobrantes**.
- El SQL compilado de `dim_ciudades` se verificó carácter por carácter contra la macro `cleanCity()` de `includes/utils.js` — coincide, confirmando que el grafo no está desactualizado.
- Los 29 `declare()` activos de `definitions/sources.js` coinciden exactamente con las 29 declaraciones del grafo. (Nota: `sources.js` tiene además 3 `declare()` **comentados** para `tbl_profiling`, `Calculator_table` y `stg_hdc_parsed_age` — versiones viejas que quedaron como rastro histórico cuando esas tablas pasaron a construirse con SQL propio; no generan conflicto porque están comentadas, pero podrían limpiarse.)
- Se calculó cobertura real de assertions: solo 9 de 26 tablas tienen al menos un test — ver `arquitectura-y-linaje.md #0`.

## 1. 🔴 Inconsistencia de nombres: dimensión de género — CONFIRMADA, causa raíz identificada

Además de lo ya descrito abajo: revisé `sources.js` línea por línea. El bloque `declare()` de `BI.dim_nombres_genero` (línea 173-178) está precedido del comentario `// 22. Usuarios (Asesores)` — **el mismo comentario, sin editar, que el bloque anterior** (línea 165, para `dim_smlv`). Es decir, todo el bloque (comentario + descripción) fue copiado y pegado dos veces seguidas y solo se corrigió el campo `name`. Esto confirma que la descripción no es informativa en absoluto — no hay pista recuperable del código sobre qué es realmente `dim_nombres_genero` más allá de sus columnas. Sigue pendiente de confirmación humana.

## 2. 🟡 Descripciones placeholder en 3 fuentes declaradas

`BI.dim_smlv`, `BI.dim_nombres_genero` y `BI.dim_parametros_score` están declaradas en `definitions/sources.js` con la **misma descripción literal** que `tbl_user` ("Usuarios del sistema"), que evidentemente no las describe. Es un caso de copiar/pegar en el código fuente, no un error mío de lectura. Documenté cada una con su nombre y columnas reales (ver `diccionario-datos.md`), pero dejé la descripción original visible y marcada para que se corrija en `sources.js` cuando haya oportunidad.

## 3. 🟡 Tablas con SQL definido pero deshabilitadas (`disabled: true`)

Estas 6 tablas tienen SQLX activo en el repo pero Dataform no las ejecuta. No es un error — puede ser intencional (legacy, en pausa) — pero un tablero que dependa de ellas estaría leyendo datos congelados:


- `BI.profiling_dashboard_quick_win` — *Quick Win V2: Paridad 1:1 con la tabla Legacy garantizada.*
- `BI.stg_calculadora_lite_matrix` — *Anexo Financiero. Parsing único + Lógica de Negocio + Redondeo a 2 decimales.*
- `BI.tbl_MPK_v2` — *Tabla unificada de Motor de Política de Crédito (MPK). Versión incremental optimizada.*
- `BI.tbl_calculator_master` — *Tabla Silver Maestra V10 (SCD Tipo 2) con herencia de Seguridad Looker.*
- `BI.tbl_contador_unificado_2` — *Tabla Unificada de Eventos. Fuente: Changelog + Leads. Incluye deduplicación técnica, limpieza de borrados y detección de huérfanos.*
- `firestore_calculator.Calculator_table` — *Tabla Calculadora Maestra V5.1. Versión TEST Incremental pura (sin RN físico).*

## 4. 🟡 Dos tablas apuntando a nombres de archivo casi idénticos

`BI.tbl_contador_unificado` (activa, `definitions/gold/tbl_contador_unificado.sqlx`) y `BI.tbl_contador_unificado_2` (deshabilitada, `definitions/tbl_contador_unificado.sqlx`, sin subcarpeta `gold/`) tienen el mismo nombre de archivo base y una lógica de negocio parecida (ambas consolidan leads Pro/Lite/seguimientos). Confirmar si `_2` es un borrador que debería eliminarse del repo o si sigue vigente para algo puntual.

## 5. 🟢 Tableros marcados "Pendiente de Migración" en el directorio

En `Directorio_Dashboards_Analitica.xlsx` (hoja *Looker Koggi*), **Reporte Usabilidad** y la pestaña *Análisis CS* del **Tablero Control** tienen como conexión `SQL ... -> Pendiente Migración` en vez de una tabla BigQuery. No tienen tabla fuente que documentar todavía — quedan listados en `mapeo-tableros-looker.md` con esa nota, sin inventar una tabla destino.

## 6. 🟢 `dim_genero_nombres` y `dim_persona_genero` no están en el grafo de Dataform

El notebook las escribe directo con `bigquery.Client()`, no vía Dataform — así que no aparecen ni como `tables` ni como `declarations` en `compiled_graph.json`. Es esperado (es un proceso Python aparte), pero significa que **no hay assertion ni test de Dataform vigilando su esquema** — cualquier cambio en el notebook puede romper silenciosamente lo que las consuma.
